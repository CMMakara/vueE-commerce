import { reactive } from "vue";

export function useProductValidation() {
  const errors = reactive({});

  const validateProduct = (product, imageFile) => {
    errors.title = "";
    errors.price = "";
    errors.image = "";
    errors.category_ids = "";

    let isValid = true;

    if (!product.title) {
      errors.title = "Title is required";
      isValid = false;
    }

    if (!product.price || product.price <= 0) {
      errors.price = "Price must be greater than 0";
      isValid = false;
    }

    if (!imageFile) {
      errors.image = "Image is required";
      isValid = false;
    }

    if (!product.category_ids) {
      errors.category_ids = "Category is required";
      isValid = false;
    }

    return isValid;
  };

  return { errors, validateProduct };
}