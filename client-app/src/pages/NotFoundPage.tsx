import Button from '@mui/material/Button';
import { Img } from "../components/Img";
import { Box, Card, CardContent, CardMedia } from '@mui/material';

export function NotFoundPage() {
    return (
        <div className="flex justify-between items-center gap-44 w-full m-10">
            <div className="flex flex-col gap-8 items-start">
                <div className="text-4xl text-dark-petrol font-mono font-extrabold">
                    Where are you wandering?
                </div> 
                <div>
                    <div className="text-xl text-gray-500 font-mono">
                        It looks like that page doesn't exist. 
                    </div>
                    <div className="text-xl text-gray-500 font-mono">
                        Please check the URL and try again.
                    </div>
                </div>
                <Button variant="contained" size="large" LinkComponent={NotFoundPage}>
                    Go to Home Page
                </Button>
            </div>
            
            {/* <Box
                component="img"
                sx={{
                    marginTop: 5,
                    height: 500,
                    width: 800,
                }}
                src="https://img.freepik.com/premium-vector/man-with-backpack-traveller-explorer-standing-top-mountain-cliff-looking-valley-mountains-landscape-traveling-hiking-exploring-tourism-concept_148087-346.jpg"
                /> */}
            <Card>
                <div style={{height: 500, width: 700}}>
                    <CardContent>
                      <div style={{position: 'relative'}} >
                        <CardMedia
                            component="img"
                            image="https://img.freepik.com/premium-vector/man-with-backpack-traveller-explorer-standing-top-mountain-cliff-looking-valley-mountains-landscape-traveling-hiking-exploring-tourism-concept_148087-346.jpg"
                        />
                      </div>
                    </CardContent>
                </div>           
                <div style={{
                    paddingBottom: 20,
                    color: 'black', 
                    fontSize: 40,
                    fontFamily: 'monospace',
                    fontStyle: 'oblique',
                }} >Error 404</div>    
            </Card>    
        </div>
    );
}
