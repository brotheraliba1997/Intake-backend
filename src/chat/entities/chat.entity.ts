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


// export class Chat {
//   id: string;

//   @ApiProperty({
//     description: 'Name of the program',
//     example: 'ABC Health Insurance',
//   })
//   @IsNotEmpty()
//   @IsString()
//   name: string;

//   @IsNotEmpty()
//   @IsBoolean()
//   isGroup: boolean;

//   @IsNotEmpty()
//   @IsArray()
//   participants: string[];

//   // @IsOptional()
//   // @IsArray()
//   // @ArrayMinSize(1) // Kam az kam ek participant hona chahiye
//   // @IsString({ each: true }) // Har element ek string hona chahiye
//   // messages: string[];
// }
