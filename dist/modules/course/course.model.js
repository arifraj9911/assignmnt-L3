"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const dayjs_1 = __importDefault(require("dayjs"));
const tagsSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
}, {
    _id: false,
});
const detailsSchema = new mongoose_1.Schema({
    level: { type: String, required: true },
    description: { type: String, required: true },
});
const courseSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    instructor: { type: String, required: true },
    categoryId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Category",
        required: false,
    },
    price: { type: Number, required: true },
    tags: { type: [tagsSchema], default: [] },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    language: { type: String, required: true },
    durationInWeeks: { type: Number },
    details: { type: detailsSchema, required: true },
}, {
    timestamps: true,
});
courseSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.startDate && this.endDate) {
            const start = (0, dayjs_1.default)(this.startDate);
            const end = (0, dayjs_1.default)(this.endDate);
            const weeks = end.diff(start, "week");
            this.durationInWeeks = weeks;
        }
        next();
    });
});
const Course = (0, mongoose_1.model)("Course", courseSchema);
exports.default = Course;
