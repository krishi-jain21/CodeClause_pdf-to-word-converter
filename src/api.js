export const pdf_to_doc=async(file) =>{
    const url = 'https://pdf4me.p.rapidapi.com/RapidApi/ConvertPdfToWord?quality=high';
    const data = new FormData();
    data.append('File', file);
    const options = {
        method: 'POST',
        headers: {
            'Accept-Encoding': 'gzip, deflate, br',
            Accept: '*/*',
            'X-RapidAPI-Key': 'd6091a34d0msh6552decae094c01p15e810jsnfb851ceded2e',
            'X-RapidAPI-Host': 'pdf4me.p.rapidapi.com'
        },
        body: data
    };
    
    try {
        const response = await fetch(url, options);
        return await response.json();
    } catch (error) {
        console.error(error);
    }    
}