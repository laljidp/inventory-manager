import * as Yup from 'yup'

export const inventorySchema = Yup.object().shape({
  name: Yup.string()
    .required('Product name is required!')
    .min(2, 'Too Short name!')
    .max(50, 'Too long name!'),
  code: Yup.string()
    .required('Product code is required!')
    .min(2, 'Too Short name!')
    .max(50, 'Too long name!'),
  description: Yup.string().required('Description is required!'),
  quantity: Yup.number('Invalid quantity entered!').required(
    'Quantity is required!'
  ),
  costPrice: Yup.number('Invalid cost price entered!').required(
    'Cost price is requried'
  ),
  sellingPrice: Yup.number('Invalid selling price entered!').required(
    'Selling price is required'
  ),
})
