import { applyDecorators } from "@nestjs/common"
import { ApiResponse } from "@nestjs/swagger"


export const apiAuth = (()=>{
    return applyDecorators(
         ApiResponse({
            status:401,
            description:"Missing o invalid token"
          }),
          ApiResponse({
            status:403,
            description:"Missing role"
          }),
          ApiResponse({
            status:500,
            description:"Server error"
          })
    )
})