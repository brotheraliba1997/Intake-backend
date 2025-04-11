// import { CoreEntity } from 'src/common/entities/core.entity';
// import {
//   ArrayMinSize,
//   IsArray,
//   IsBoolean,
//   IsEmail,
//   IsEmpty,
//   IsEnum,
//   isEnum,
//   IsNotEmpty,
//   IsOptional,
//   IsPhoneNumber,
//   IsString,
//   Matches,
// } from 'class-validator';
// import { JsonValue } from 'type-fest'; // Import JsonValue if not already available
// import { ApiProperty } from '@nestjs/swagger';
// import { Transform } from 'class-transformer';

// export class Message {
//   id: string;

//   @IsOptional()
//   @IsString()
//   chatId: string;

//   @IsOptional()
//   @IsString()
//   senderId: string;

//   @ApiProperty({
//     description: 'The content of the message',
//   })
//   @IsNotEmpty()
//   @IsString()
//   content: string;

//   @ApiProperty({
//     description: 'The type of message (e.g., text, image, video)',
//     default: 'text',
//   })
//   @IsNotEmpty()
//   @IsString()
//   messageType: string;

//   @IsOptional()
//   @IsArray()
//   seenBy: string[];
// }
