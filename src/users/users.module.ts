import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { ProductsModule } from 'src/products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import config from 'src/config';
import { ConfigType } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';

@Module({
  controllers: [UsersController, AuthController],
  providers: [UsersService, AuthService, LocalStrategy, JwtStrategy],
  exports: [UsersService],
  imports: [
    ProductsModule,
    PassportModule,
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        const { secret, expires } = configService.jwt;
        return { secret, signOptions: { expiresIn: expires } };
      },
      inject: [config.KEY],
    }),
  ],
})
export class UsersModule {}
