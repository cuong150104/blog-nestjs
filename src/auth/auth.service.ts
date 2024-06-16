import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { emit } from 'process';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private JwtService: JwtService,
        private configService: ConfigService
    ) { }

    async register(registerUserDto: RegisterUserDto): Promise<User> {
        const hashPassword = await this.hashPassword(registerUserDto.password);

        return await this.userRepository.save({ ...registerUserDto, refresh_token: "refresh_token_string", password: hashPassword });
    }

    async login(loginUserDto: LoginUserDto): Promise<any> {
        const user = await this.userRepository.findOne(
            {
                where: { email: loginUserDto.email }
            }
        )
        if (!user) {
            throw new HttpException("Email is not exist", HttpStatus.UNAUTHORIZED);
        }

        const checkPass = bcrypt.compareSync(loginUserDto.password, user.password);

        if (!checkPass) {
            throw new HttpException('Password is not correct', HttpStatus.UNAUTHORIZED);
        }
        //generate access token and refresh token           jwt
        const payload = { id: user.id, email: user.email }

        return this.generateToke(payload);
    }

    async refreshToken(refresh_token: string): Promise<any> {
        try {
            const verify = await this.JwtService.verifyAsync(refresh_token, {
                secret: this.configService.get<string>('SECRET')
            })
            const checkExistToken = await this.userRepository.findOneBy({ email: verify.email, refresh_token })
            if (checkExistToken) {
                return this.generateToke({ id: verify.id, email: verify.email })

            } else {
                throw new HttpException('Refresh  token is not valid', HttpStatus.BAD_REQUEST);
            }
        } catch (error) {
            throw new HttpException('Refresh token is not valid', HttpStatus.BAD_REQUEST);
        }
    }

    private async generateToke(payload: { id: number; email: string; }) {
        const access_token = await this.JwtService.signAsync(payload);

        const refresh_token = await this.JwtService.signAsync(payload, {
            secret: this.configService.get<string>('SECRET'),
            expiresIn: this.configService.get<string>('EXP_IN_REFRESH_TOKRN'),
        });

        await this.userRepository.update(
            { email: payload.email },
            { refresh_token: refresh_token }
        );

        return { access_token, refresh_token };
    }

    private async hashPassword(password: string): Promise<string> {
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const hash = await bcrypt.hash(password, salt);

        return hash;
    }
}

