import { Typography, Box } from "@mui/material";
import '../App.css';

const Card = ({ data }) => {
    const { city, country, temperature, conditionText, icon } = data;

    return (
        <>
            <div className="card">
                <Typography
                    variant="h4"
                    component="h2"
                >
                    {city}, {country}
                </Typography>
                <Box
                    component="img"
                    alt={conditionText}
                    src={icon}
                    sx={{ margin: "0 auto" }}
                />
                <Typography
                    variant="h5"
                    component="h3"
                >
                    {temperature} °C
                </Typography>
                <Typography
                    variant="h6"
                    component="h4"
                >
                    {conditionText}
                </Typography>
            </div >
        </>
    );
};

export default Card;
