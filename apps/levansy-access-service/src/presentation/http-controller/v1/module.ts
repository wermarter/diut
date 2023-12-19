import { ModuleMetadata } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule } from '@diut/nest-core'

import { BioProductController } from './bio-product/controller'
import { TestCategoryController } from './test-category/controller'
import { AuthController } from './auth/controller'
import { AuthConfig, loadAuthConfig } from 'src/infrastructure/config'
import { JwtStrategy, LocalStrategy } from './auth/strategies'
import { JwtAuthGuard } from './auth/guards'

export const httpControllerV1Metadata: ModuleMetadata = {
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule.forFeature(loadAuthConfig)],
      inject: [loadAuthConfig.KEY],
      useFactory: (authConfig: AuthConfig) => {
        return {
          secret: authConfig.AUTH_JWT_SECRET,
          signOptions: {
            expiresIn: authConfig.AUTH_JWT_EXPIRES_IN,
          },
        }
      },
    }),
  ],
  providers: [
    LocalStrategy,
    JwtStrategy,
    {
      provide: 'APP_GUARD',
      useClass: JwtAuthGuard,
    },
  ],
  controllers: [BioProductController, TestCategoryController, AuthController],
}
