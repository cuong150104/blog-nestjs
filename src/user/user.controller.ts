import { BadRequestException, Body, Controller, Delete, Get, Param, ParseArrayPipe, Post, Put, Query, Req, SetMetadata, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FilterUserDto } from './dto/filter-user.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageConfig } from 'helpers/config';
import { extname } from 'path';
import { Public } from '../decorator/public.decorator';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UserController {
    constructor(private userService: UserService) { }


    @SetMetadata('roles', ['Admin'])
    @ApiQuery({ name: 'page' })
    @ApiQuery({ name: 'items_per_page' })
    @ApiQuery({ name: 'search' })
    @Get()
    findAll(@Query() query: FilterUserDto): Promise<User[]> {
        console.log(query);
        return this.userService.findAll(query);
    }




    @Get('profile')
    profile(@Req() req: any): Promise<User> {
        return this.userService.findOne(Number(req.user_data.id))
    }

    @Public()
    @Get(':id')
    findOne(@Param('id') id: string): Promise<User> {
        return this.userService.findOne(Number(id));
    }

    @SetMetadata('roles', ['Admin'])
    @Post()
    create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.userService.create(createUserDto);
    }

    @SetMetadata('roles', ['Admin'])
    @Put(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(Number(id), updateUserDto);
    }

    @SetMetadata('roles', ['Admin'])
    @Delete('multiple')
    multipleDelete(@Query('ids', new ParseArrayPipe({ items: String, separator: ',' })) ids: string[]) {
        console.log("delete multi=> ", ids)
        return this.userService.multipleDelete(ids)
    }

    @SetMetadata('roles', ['Admin'])
    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.userService.delete(Number(id));
    }


    @Post('upload-avatar')
    @UseInterceptors(FileInterceptor('avatar',
        {
            storage: storageConfig('avatar'),
            fileFilter: (req, file, cb) => {
                const ext = extname(file.originalname);
                const allowedExtArr = ['.jpg', '.png', '.jpeg'];
                if (!allowedExtArr.includes(ext)) {
                    req.fileValidationError = `Wrong extension type. Accepted file ext are: ${allowedExtArr.toString()}`
                    cb(null, false);
                } else {
                    const fileSize = parseInt(req.headers['content-length']);
                    if (fileSize > 1024 * 1024 * 5) {
                        req.fileValidationError = 'File size is toolarge. Accepted file size is less than 5 MB'
                        cb(null, false);
                    } else {
                        cb(null, true);
                    }
                }
            }

        }))


    uploadAvatar(@Req() req: any, @UploadedFile() file: Express.Multer.File) {
        console.log("upload avatar")
        console.log("user data", req.user_data)
        console.log(file);

        if (req.fileValidationError) {
            throw new BadRequestException(req.fileValidationError);
        }

        if (!file) {
            throw new BadRequestException('File is required');
        }
        const parts = file.destination.split('/');
        return this.userService.updateAvatar(req.user_data.id, parts[1] + '/' + file.filename);
    }


}
