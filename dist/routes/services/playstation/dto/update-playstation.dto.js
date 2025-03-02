"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePlaystationDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_playstation_dto_1 = require("./create-playstation.dto");
class UpdatePlaystationDto extends (0, mapped_types_1.PartialType)(create_playstation_dto_1.CreatePlaystationDto) {
}
exports.UpdatePlaystationDto = UpdatePlaystationDto;
//# sourceMappingURL=update-playstation.dto.js.map