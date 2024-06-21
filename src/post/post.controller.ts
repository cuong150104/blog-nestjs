import { BadRequestException, Body, Controller, Post, Query, Req, UploadedFile, UseGuards, UseInterceptors, Get, Param, Put, Delete, UsePipes, ValidationPipe, SetMetadata } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageConfig } from 'helpers/config';
import { extname } from 'path';
import { PostService } from './post.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { FilterPostDto } from './dto/filter-post.dto';
import { Post as PostEntity } from './entities/post.entity';
import { UpdatePostDto } from './dto/update-post.dto';
import { Public } from '../decorator/public.decorator';
@Controller('posts')
export class PostController {
    constructor(private postService: PostService) { }

    @UseGuards(AuthGuard)
    @UsePipes(ValidationPipe)
    @Post()
    @UseInterceptors(FileInterceptor('thumbnail',
        {
            storage: storageConfig('post'),
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
    create(@Req() req: any, @Body() createPostDto: CreatePostDto, @UploadedFile() file: Express.Multer.File) {
        console.log(req['user_data']);
        console.log(createPostDto)
        console.log(file);
        if (req.fileValidationError) {
            throw new BadRequestException(req.fileValidationError);
        }

        if (!file) {
            throw new BadRequestException('File is required');
        }

        return this.postService.create(req['user_data'].id, { ...createPostDto, thumbnail: 'post/' + file.filename });
    }

    @SetMetadata('roles', ['Admin', 'User'])
    @Get()
    findAll(@Query() query: FilterPostDto): Promise<any> {
        return this.postService.findAll(query);
    }


    @Get(':id')
    @Public()
    findDetail(@Param('id') id: string): Promise<PostEntity> {
        return this.postService.findDetail(Number(id));
    }



    @UseGuards(AuthGuard)
    @Put(':id')
    @UseInterceptors(FileInterceptor('thumbnail',
        {
            storage: storageConfig('post'),
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
    update(@Param('id') id: string, @Req() req: any, @Body() updatePostDto: UpdatePostDto, @UploadedFile() file: Express.Multer.File) {
        if (req.fileValidationError) {
            throw new BadRequestException(req.fileValidationError);
        }

        if (file) {
            updatePostDto.thumbnail = 'post/' + file.filename;
        }

        return this.postService.update(Number(id), updatePostDto);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.postService.delete(Number(id));
    }


    @Post('cke-upload')
    @UseInterceptors(FileInterceptor('upload', {
        storage: storageConfig('ckeditor'),
        fileFilter: (req, file, cb) => {
            const ext = extname(file.originalname);
            const allowedExtArr = ['.jpg', '.png', '.jpeg'];
            if (!allowedExtArr.includes(ext)) {
                req.fileValidationError = `Wrong extension type. Accepted file ext are: ${allowedExtArr.toString()}`;
                cb(null, false);
            } else {
                const fileSize = parseInt(req.headers['content-length']);
                if (fileSize > 1024 * 1024 * 5) {
                    req.fileValidationError = 'File size is too large. Accepted file size is less than 5 MB';
                    cb(null, false);
                } else {
                    cb(null, true);
                }
            }
        }
    }))
    ckeUpload(@Body() data: any, @UploadedFile() file: Express.Multer.File) {
        console.log(data, '=>', data);
        console.log(file);
        return {
            'url': `ckeditor/${file.filename}`
        }
    }

}
