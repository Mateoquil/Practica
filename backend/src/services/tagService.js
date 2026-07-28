import tag from "../models/tag.js";

class TagService {
    async create(tagType) {
        try {
            const existingTag = await tag.findOne({ where: { type: tagType } });
            if (existingTag) throw new Error("Tag already exists");

            const createdTag = await tag.create({ type: tagType });
            if (!createdTag) throw new Error("Error creating tag in the database");

            return { id: createdTag.dataValues.id, type: createdTag.dataValues.type };
        } catch (error) {
            console.log("Error in tag service (create):", error);
        }
    }

    async findAll() {
        try {
            const { count, rows } = await tag.findAndCountAll();
            if (count === 0) throw new Error("No tags found");
            return { count, tags: rows };
        } catch (error) {
            console.log("Error in tag service (findAll):", error);
        }
    }

    // TODO BUG: this method is called "findOne" but it actually DESTROYS the record.
    // delete() below calls this.findOne(tagId) expecting a lookup, but it silently
    // deletes the tag here first, then tries to delete it again below. Needs a real
    // lookup (tag.findByPk / tag.findOne) separate from the destroy logic.
    async findOne(tagId) {
        try {
            const foundTag = await tag.destroy({ where: { id: tagId } });
            if (!foundTag) throw new Error("Tag not found");
            return foundTag;
        } catch (error) {
            console.log("Error in tag service (findOne):", error);
        }
    }

    async delete(tagId) {
        try {
            const tagExists = await this.findOne(tagId);
            if (!tagExists) throw new Error("Tag not found");
            const deletedTag = await tag.destroy({ where: { id: tagId } });
            return { message: "Tag deleted successfully", deletedTag };
        } catch (error) {
            console.log("Error in tag service (delete):", error);
        }
    }
}

export default TagService;