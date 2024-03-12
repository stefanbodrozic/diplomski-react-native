const uri =
  'https://as1.ftcdn.net/v2/jpg/03/58/54/86/1000_F_358548675_OWiuGttT2nV4HcJknRO4WWfKLDa8e29s.jpg'
const productUri =
  'https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png'

export default [
  {
    product: {
      id: '1',
      name: 'Macbook',
      price: '1500',
      description:
        'The Apple MacBook is a premium line of laptops designed and produced by the renowned tech giant, Apple Inc. These laptops are highly regarded for their sleek, stylish, and minimalist design, as well as their top-notch performance and user-friendly features. The latest Apple MacBook models boast cutting-edge technology and powerful hardware components, including the latest generation processors, high-resolution Retina displays, and advanced graphics cards. These laptops are also equipped with innovative features such as the Touch Bar, which allows users to access frequently used tools and controls with just a touch.',
      images: [productUri, uri, productUri],
      uri: productUri
    },
    quantity: 1
  },
  {
    product: {
      id: '2',
      name: 'Lenovo',
      uri: productUri,
      price: '2000',
      images: [productUri, uri, productUri],
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    quantity: 10
  }
]
