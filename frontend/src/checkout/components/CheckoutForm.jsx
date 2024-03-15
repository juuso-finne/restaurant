import { useForm } from "react-hook-form";
import { Grid, TextField, Button, Typography } from '@mui/material';

const CheckoutForm = ({ submitHandler, user }) => {

    const { register, handleSubmit } = useForm();
    return (
        <div>
            <Typography variant="h5">Delivery info:</Typography>
            <form onSubmit={handleSubmit(submitHandler)}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            required
                            label="Name"
                            type="text"
                            defaultValue={user.name}
                            {...register("name", { required: true })}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            label="E-mail"
                            type="email"
                            defaultValue={user.email}
                            {...register("email", { required: true })}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            label="Address"
                            type="text"
                            {...register("street", { required: true })}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            label="Zip code"
                            type="text"
                            {...register("postalcode", { required: true })}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            label="City"
                            type="text"
                            {...register("city", { required: true })}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary">
                            Place order
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}

export default CheckoutForm;