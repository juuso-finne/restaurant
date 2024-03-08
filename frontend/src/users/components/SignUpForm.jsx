import { useForm } from "react-hook-form";
import { Button, Grid, TextField } from '@mui/material';

const SignUpForm = ({ submitHandler }) => {
    const { register, handleSubmit } = useForm();
    return (
        <form onSubmit={handleSubmit(submitHandler)}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        required
                        label="Name"
                        type="text"
                        {...register("name", { required: true })}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        required
                        label="E-mail"
                        type="email"
                        {...register("email", { required: true })}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        required
                        label="Password"
                        type="password"
                        {...register("password", { required: true })}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary">
                        Sign up
                    </Button>
                </Grid>
            </Grid>
        </form>
    )
}

export default SignUpForm