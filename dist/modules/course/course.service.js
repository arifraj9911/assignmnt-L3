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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseServices = void 0;
const course_model_1 = __importDefault(require("./course.model"));
const createCourseIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.default.create(payload);
    return result;
});
const getAllCourseFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm, sort, tags, page, limit, fields } = query, otherFilters = __rest(query, ["searchTerm", "sort", "tags", "page", "limit", "fields"]);
    let searchQuery = {};
    if (searchTerm) {
        searchQuery = {
            $or: [
                { title: { $regex: searchTerm, $options: "i" } },
                { instructor: { $regex: searchTerm, $options: "i" } },
                { language: { $regex: searchTerm, $options: "i" } },
            ],
        };
    }
    if (tags) {
        searchQuery.tags = {
            $elemMatch: {
                name: tags,
            },
        };
    }
    let sortQuery = "-__v";
    if (sort) {
        sortQuery = sort;
    }
    let pageNumber = 1;
    let limitNumber = 10;
    let skip = 0;
    if (limit) {
        limitNumber = Number(query.limit);
    }
    if (page) {
        pageNumber = Number(query.page);
        skip = (pageNumber - 1) * limitNumber;
    }
    let fieldsQuery = "";
    if (fields) {
        fieldsQuery = fields.split(",").join(" ");
    }
    const finalQuery = Object.assign(Object.assign({}, searchQuery), otherFilters);
    const result = yield course_model_1.default.find(finalQuery)
        .populate("category")
        .sort(sortQuery)
        .skip(skip)
        .limit(limitNumber)
        .select(fieldsQuery);
    const totalCount = yield course_model_1.default.countDocuments(finalQuery);
    return {
        result,
        meta: {
            page,
            limit,
            total: totalCount,
        },
    };
});
exports.CourseServices = {
    createCourseIntoDB,
    getAllCourseFromDB,
};
