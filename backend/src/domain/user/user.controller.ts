import { Req, Get, Put, Body, UseInterceptors, UploadedFile } from "@nestjs/common";
import { CustomRequest } from "src/custom/myRequest/customRequest";
import { CustomFile } from "src/custom/myFile/customFile";
import { UserService } from "./user.service";
import { UserInfoResponseDto } from "src/domain/user/dto/userInfoResponse.dto";
import { UpdateUserInfoRequestDto } from "src/domain/user/dto/updateUserInfoRequest.dto";
import { UpdateGroupOrderRequestDto } from "src/domain/user/dto/updateGroupOrderRequest.dto";
import { GetGroupsResponseDto } from "src/domain/user/dto/getGroupsResponse.dto";
import { UpdateUserInfoResponseDto } from "src/domain/user/dto/updateUserInfoResponse.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { multerOption } from "src/configs";
import { SwaggerUpdateUserInfo, SwaggerGetUserInfo, SwaggerUpdateGroupOrder, SwaggerGetGroups } from "./swagger";
import { CustomController } from "src/custom/decorator/controller.decorator";
import { UpdateResult } from "typeorm";

@CustomController("user", "유저 API")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @SwaggerGetUserInfo()
  GetUserInfo(@Req() { user }: CustomRequest): Promise<UserInfoResponseDto> {
    const { userId } = user;
    return this.userService.getUserInfo(userId);
  }

  @Put()
  @UseInterceptors(FileInterceptor("profileImage", multerOption))
  @SwaggerUpdateUserInfo()
  UpdateUserInfo(
    @Req() { user }: CustomRequest,
    @Body() updateUserInfoRequestDto: UpdateUserInfoRequestDto,
    @UploadedFile() file: CustomFile,
  ): Promise<UpdateUserInfoResponseDto> {
    const { userId } = user;

    return this.userService.updateUserInfo(userId, file, updateUserInfoRequestDto);
  }

  @Put("/grouporder")
  @SwaggerUpdateGroupOrder()
  UpdateGroupOrder(
    @Req() { user }: CustomRequest,
    @Body() updateGroupOrderRequestDto: UpdateGroupOrderRequestDto,
  ): Promise<UpdateResult> {
    const { userId } = user;
    return this.userService.updateGroupOrder(userId, updateGroupOrderRequestDto);
  }

  @Get("groups")
  @SwaggerGetGroups()
  GetGroups(@Req() { user }: CustomRequest): Promise<GetGroupsResponseDto> {
    const { userId } = user;
    return this.userService.getGroups(userId);
  }
}
