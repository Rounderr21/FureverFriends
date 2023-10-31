const data = [ 
    title = "GreenShap",
    header = "Welcome to GreenSnaps!",
    subheader = "Your Green Oasis in the Digital World!",
    description = `In a world that's more connected than ever, where social media platforms bring people together from all corners of the globe, 
there's a thriving community waiting to blossom. Welcome to PlantGram, the app designed exclusively for the nature enthusiasts, the garden gurus, 
and the plant parents who turn their homes into thriving botanical wonderlands.

GreenSnaps is not just another social network; it's a lush paradise dedicated to the green thumb in all of us. 
Whether you're a seasoned horticulturalist or a budding plant lover, this app is your passport to a vibrant community where the language of 
leaves and blooms is understood and celebrated.`,
];

app.get('/', (req, res) => {
    res.render('index', data);
});