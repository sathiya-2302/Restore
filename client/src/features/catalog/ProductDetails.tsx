import { useParams } from "react-router-dom"
import { Button, Divider, Grid2, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { useFetchProductDetailsQuery } from "./catalogApi";

export default function ProductDetails() {
  const { id } = useParams();
  const { data: product, isLoading } = useFetchProductDetailsQuery(id ? parseInt(id) : 0)
  // const [product, setProduct] = useState<Product | null>(null);

  // useEffect(() => {

  //   fetch(`https://localhost:5001/api/product/${id}`)
  //     .then(response => response.json())
  //     .then(data => setProduct(data))
  //     .catch(error => console.log(error))
  // }, [id])
  if (!product || isLoading) return <div>Loading...</div>
  const productDetails = [
    { Label: 'Name', value: product.name },
    { Label: 'Description', value: product.description },
    { Label: 'Type', value: product.type },
    { Label: 'Brand', value: product.brand },
    { Label: 'Quantity in stock', value: product.quantityInStock }
  ]
  return (
    <Grid2 container spacing={6} maxWidth='lg' sx={{ mx: 'auto' }}>
      <Grid2 size={6}>
        <img src={product?.pictureUrl} alt={product.name} style={{ width: '100%' }} />
      </Grid2>
      <Grid2 size={6}>
        <Typography variant='h3'>{product.name}</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant='h4' color='secondary'>${(product.price / 100).toFixed(2)}</Typography>
        <TableContainer>
          <Table sx={{
            '& td': { fontSize: '1rem' }
          }}
          >
            <TableBody>
              {productDetails.map((details, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ fontWeight: 'bold' }}> {details.Label}</TableCell>
                  <TableCell>{details.value}</TableCell>
                </TableRow>
              ))}

            </TableBody>
          </Table>
        </TableContainer>
        <Grid2 container spacing={2} marginTop={3}>
          <Grid2 size={6}>
            <TextField
              variant='outlined'
              type='number'
              label='Quantity in Basket'
              fullWidth
              defaultValue={1}
            />
          </Grid2>
          <Grid2 size={6}>
            <Button
              color='primary'
              size='large'
              variant='contained'
              fullWidth
              sx={{ height: '55px' }}
            >
              Add To  Basket
            </Button>
          </Grid2>
        </Grid2>
      </Grid2>
    </Grid2>
  )
}
