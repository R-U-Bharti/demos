import { GoogleGenerativeAI } from "@google/generative-ai";
import './style.css'
import up from './upload.svg'
import { useState } from "react";
import toast from "react-hot-toast";

const ImageAnalyser = () => {
  const [prompt, setPrompt] = useState('')
  const [document, setDocument] = useState(null)
  const [tempImage, setTempImage] = useState(null)
  const [tempImage2, setTempImage2] = useState(null)
  const [result, setResult] = useState('')
  const [loader, setLoader] = useState(false)

  const API_KEY = import.meta.env.VITE_AI_KEY;

  const genAI = new GoogleGenerativeAI(API_KEY);

  const parseContent = (text) => {

    let parsedText = text;

    // Replace < and > with &lt; and &gt;
    parsedText = parsedText.replace(/</g, '&lt;').replace(/>/g, '&gt;');

    parsedText = parsedText.replace(/\[(https.*)\]\((https.*)\)/g, '<a style="color: skyblue" target="_blank" href="$1">$2</a>');

    // Replace ```code``` with <pre><code> tags
    parsedText = parsedText.replace(/```(\w*)([\s\S]*?)```/g, '<code style="background-color: green; padding: 4px;">$1</code><pre style="overflow: auto; padding: 0px 8px; background-color: black"><code>$2</code></pre>');

    // Replace ## with <h2> tags
    parsedText = parsedText.replace(/##\s*(.*?)\s*\n/g, '<h2>$1</h2>');

    // Replace **text** with <strong> tags
    parsedText = parsedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Replace \n with <br> for line breaks
    parsedText = parsedText.replace(/\n/g, '<br>');


    return parsedText;

  };

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

  // For Text only
  const getTextResult = async (e) => {

    e.preventDefault()

    setTempImage2(null)

    // const prompt = "Write a story about a magic backpack."
    setLoader(true)

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      setResult(text);
    } catch (error) {
      console.log(error)
      toast.error('Please try again later...')
    } finally {
      setPrompt('')
      setLoader(false)
    }
  }

  // For text and image
  async function fileToGenerativePart(file) {
    const base64EncodedDataPromise = new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(',')[1]);
      reader.readAsDataURL(file);
    });
    return {
      inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
    };
  }

  const getTextImageResult = async (e) => {

    e.preventDefault()
    setLoader(true)

    const image = await fileToGenerativePart(document);
    
    try {
      const result = await model.generateContent([prompt, image]);
      const text = result.response.text();
      setTempImage2(document)
      setResult(text);
    } catch (error) {
      console.log(error)
      toast.error('Please try again later...')
    } finally {
      setDocument(null)
      setPrompt('')
      setLoader(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    setTempImage(null)
    setResult('')

    if (document === null)
      getTextResult(e);
    else
      getTextImageResult(e);

  }

  return (
    <div className='h-full w-screen bg-transparent backdrop-blur-xl flex flex-col justify-start p-2 md:p-10 gap-4'>

      <div className='text-center md:text-3xl text-2xl font-bold'>
        Image Analyser by Gen AI
      </div>

      <div className='flex justify-center w-full'>
        <form onSubmit={handleSubmit} className='flex flex-col w-full md:w-[50%]'>
          {tempImage && <img className='border w-full' src={URL.createObjectURL(tempImage)} alt="" srcset="" />}

          <div className='flex w-full'>
            <textarea cols={3} type="text" name="" id="" onChange={e => setPrompt(e.target.value)} className='w-full px-2 bg-black/30 focus:outline-none border border-gray-300/40' />

            <label for="file" class="labelFile">
              <p style={{ fontSize: 12 }}>Attach Image</p></label>
            <input accept='.jpg, .png, jpeg, .webp' class="input" name="text" id="file" type="file" onChange={e => (setDocument(e.target.files[0]), setTempImage(e.target.files[0]))} />
          </div>

          <button disabled={loader} type="submit" className='text-sm px-2 py-1.5 bg-green-500 hover:bg-green-600'>{loader ? "Thinking...." : "Go"}</button>
        </form>
      </div>

      {result && tempImage2 && <img className='border w-full md:w-[50%] p-2' src={URL.createObjectURL(tempImage2)} alt="" srcset="" />}
      <div className='w-full md:w-[90%] p-4 md:p-6 rounded text-sm bg-zinc-800 border border-zinc-400/50 md:text-base md:text-start text-justify' dangerouslySetInnerHTML={{ __html: parseContent(result) }} />

    </div>
  )
}

export default ImageAnalyser