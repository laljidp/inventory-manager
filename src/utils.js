import * as Yup from 'yup'

export const inventorySchema = Yup.object().shape({
  product_id: Yup.string().required('Product name is required!'),
  description: Yup.string().required('Description is required!'),
  quantity: Yup.number('Invalid quantity entered!').required(
    'Quantity is required!'
  ),
})

export const productSchema = Yup.object().shape({
  name: Yup.string()
    .required('Product name is required!')
    .min(2, 'Too Short name!')
    .max(50, 'Too long name!'),
  code: Yup.string()
    .required('Product code is required!')
    .min(2, 'Too Short name!')
    .max(50, 'Too long name!'),
  description: Yup.string().required('Description is required!'),
  price: Yup.number('Invalid price entered!').required('Price is required!'),
  category: Yup.string().required('Category is requried'),
})
