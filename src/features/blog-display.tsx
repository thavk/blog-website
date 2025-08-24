import { Box, Card, CardContent, CardActions, Typography, Button } from '@mui/joy';

export const BlogCard = (props: any) => {
    const bull = (

        <Box

            component="span"
            sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
        >
            •
        </Box>
    );

    return (
        <Card variant="outlined" sx={{
            width: '95%',
            maxWidth: "95%",
        }}>
            <CardContent>
                <Typography component="span" sx={{ color: 'text.secondary', fontSize: 14 }}>
                    Word of the Day
                </Typography>

                <Typography component="h5">
                    be{bull}nev{bull}o{bull}lent
                </Typography>
                <Typography component="span" sx={{ color: 'text.secondary', mb: 1.5 }}>
                    adjective
                </Typography>
                <Typography component="p">
                    well meaning and kindly.
                    <br />
                    {'"a benevolent smile"'}
                </Typography>
            </CardContent>

            <CardActions>
                <Button size="sm">Learn More</Button>
            </CardActions>
        </Card>
    );
};

