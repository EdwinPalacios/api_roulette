import { buildProviderModule, container } from '@ioc/inversify.config';

import '@routes/v1/home/home.controller';
import '@routes/v1/roulette/roulette.controller';

import '@services/cacheService/cache.service';
import '@services/mongoClientService/mongoClient.service';
import '@services/rouletteService/roulette.service';
import '@services/userService/user.service';

container.load(buildProviderModule());
