"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTokenJwtDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_token_jwt_dto_1 = require("./create-token-jwt.dto");
class UpdateTokenJwtDto extends (0, mapped_types_1.PartialType)(create_token_jwt_dto_1.CreateTokenJwtDto) {
}
exports.UpdateTokenJwtDto = UpdateTokenJwtDto;
//# sourceMappingURL=update-token-jwt.dto.js.map