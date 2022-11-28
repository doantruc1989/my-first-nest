import { Controller, Get, Post, UseGuards, Request, Body, Delete, Patch, Param, Req, ValidationPipe, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import RegisterDto from 'src/auth/dto/register.dto';
import { HasRoles } from 'src/auth/has-roles.decorator';
import { ResponseError, ResponseSuccess } from 'src/auth/interface/response.dto';
import { IResponse } from 'src/auth/interface/response.interface';
import { JwtAuthGuard } from 'src/auth/JWT/jwt-auth.guard';
import { JwtPayload } from 'src/auth/JWT/payload.interface';
import { RolesGuard } from 'src/auth/roles.guard';
import EditUserDto from './dto/editUser.dto';
import User, { Role } from './entity/user.entity';
import { Userde } from './users.decorator';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
    constructor(private usersService: UsersService,
        private authService: AuthService
    ) { }

    @HasRoles(Role.User)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('users/profile/')
    async getProfile(@Req() req: any): Promise<JwtPayload> {
        return req.user;
    }

    @HasRoles(Role.User)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('users/profile/editProfile')
    async editProfile(
        @Userde() { username }: User,
        @Body()
        data: EditUserDto,
    ) {
        return this.usersService.updateUser(username, data);
    }


    // @HasRoles(Role.Admin)
    // @UseGuards(JwtAuthGuard, RolesGuard)
    // @Get('admin')
    // getAdmin(@Request() req) {
    //     return this.usersService.findAll();
    // }

    @HasRoles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('admin')
    getAdmin(@Query('page') page: number) {
        return this.usersService.getUser(page);
    }

    @HasRoles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('admin/createNewUser')
    async createNewUser(@Body() registrationData: RegisterDto) {
        return this.authService.register(registrationData);
    }

    @HasRoles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete('admin/deleteUser')
    async deleteUser(@Body() id: number) {
        return this.usersService.remove(id);
    }

    @HasRoles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Patch('admin/editUser/:id')
    update(@Param('id') id: number, @Body() editUserDto: EditUserDto) {
        return this.usersService.update(id, editUserDto);
    }

    @Get('email/forgot-password/:email')
    public async sendEmailForgotPassword(@Param() params): Promise<IResponse> {
        try {
            var isEmailSent = await this.usersService.sendEmailForgotPassword(params.email);

        } catch (error) {
            return new ResponseError("LOGIN.ERROR.SEND_EMAIL", error);
        }
    }

    @Post('email/reset-password')
    async setNewPassword(@Req() req) {
        console.log(req.user)
        return req.user
    }

    // @Post('email/reset-password')
    // @HttpCode(HttpStatus.OK)
    // public async setNewPassord(@Body() resetPassword: ResetPasswordDto): Promise<IResponse> {
    //   try {
    //     var isNewPasswordChanged : boolean = false;
    //     if(resetPassword.email && resetPassword.currentPassword){
    //       var isValidPassword = await this.authService.checkPassword(resetPassword.email, resetPassword.currentPassword);
    //       if(isValidPassword) {
    //         isNewPasswordChanged = await this.userService.setPassword(resetPassword.email, resetPassword.newPassword);
    //       } else {
    //         return new ResponseError("RESET_PASSWORD.WRONG_CURRENT_PASSWORD");
    //       }
    //     } else if (resetPassword.newPasswordToken) {
    //       var forgottenPasswordModel = await this.authService.getForgottenPasswordModel(resetPassword.newPasswordToken);
    //       isNewPasswordChanged = await this.userService.setPassword(forgottenPasswordModel.email, resetPassword.newPassword);
    //       if(isNewPasswordChanged) await forgottenPasswordModel.remove();
    //     } else {
    //       return new ResponseError("RESET_PASSWORD.CHANGE_PASSWORD_ERROR");
    //     }
    //     return new ResponseSuccess("RESET_PASSWORD.PASSWORD_CHANGED", isNewPasswordChanged);
    //   } catch(error) {
    //     return new ResponseError("RESET_PASSWORD.CHANGE_PASSWORD_ERROR", error);
    //   }
    // }
}
