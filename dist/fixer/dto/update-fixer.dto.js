"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFixerDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_fixer_dto_1 = require("./create-fixer.dto");
class UpdateFixerDto extends (0, mapped_types_1.PartialType)(create_fixer_dto_1.CreateFixerDto) {
}
exports.UpdateFixerDto = UpdateFixerDto;
//# sourceMappingURL=update-fixer.dto.js.map