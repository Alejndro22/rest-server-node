import { Schema, model } from 'mongoose';

const CategorySchema = Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
  },
  status: {
    type: Boolean,
    default: true,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Category = model('Category', CategorySchema);
export default Category;
