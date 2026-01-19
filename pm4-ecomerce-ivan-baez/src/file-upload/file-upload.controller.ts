import {
  Controller,
  Param,
  Put,
  UploadedFile,
  UseInterceptors,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from './file-upload.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/users/roles.enum';


@Controller('files')
export class FileUploadController {
  constructor(
    private readonly fileUploadService: FileUploadService,
  ) {}

  @ApiBearerAuth()
  @Put('uploadImage/:id')  
  @Roles(Role.Admin)
  @UseGuards(AuthGuard)

  @ApiOperation({summary:'Carga imagen  de un producto'})
  @ApiParam({
    name:'id',
    description:'ID delproducto amodificar',
  })
 @ApiConsumes('multipart/form-data')
 @ApiBody({
   schema:{
    type:'objet',
    properties:{
      file:{
        type:'string',
        format:'binary',
      }
    }
   }
 })

@ApiResponse({
  status:201,
  description:
  'La imagen  fue cargada a  Cloudinary y la url  se  cargo al producto',
})

@ApiResponse({
  status:400,
  description:
  'Validacion Fallida',
})

@ApiResponse({
  status:404,
  description:
  'Producto no encontrado',
})

  @UseInterceptors(FileInterceptor('file')) // form-data: { file: { ..., buffer: 011000... } }
  async uploadImage(
    //* 1. id
    @Param('id') productId: string,

    //* 2. imagen
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 200000,
            message: 'Supera el máximo permitido de 200 kb',
          }),
          new FileTypeValidator({
            fileType: /(.jpg|.jpeg|.png|.webp|.svg)/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.fileUploadService.uploadImage(file, productId);
  }
}


