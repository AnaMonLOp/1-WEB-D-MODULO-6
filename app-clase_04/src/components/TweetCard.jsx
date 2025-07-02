import { useState, useEffect } from "react";

export function TweetCard({ name, usuario, contenido }) {
    const [likes, setLikes] = useState(0);
    const [save, setSave] = useState(0);
    const [share, setShare] = useState(0);
    const [comment, setComment] = useState(0);

    useEffect(() => {
        //Petición a la API para saber cuantos likes hay
        console.log(`Se monto la Tweetcard de ${usuario}`)
        return () => {
            console.log(`Se desmonto la Tweetcard de ${usuario}`)
        }
    }, [])

    function handleLikeButton() {
        setLikes(prev => prev + 1);
    }

    function handleSaveButton() {
        setSave(prev => prev + 1);
    }

    function handleShareButton() {
        setShare(prev => prev + 1);
    }

    function handleCommentButton() {
        setComment(prev => prev + 1);
    }

    return (

        <div className="max-w-md mx-auto my-4 p-4 bg-white shadow-md rounded-lg">
        <div className="flex items-start gap-3">
            
            <span className="text-6xl leading-none">👨‍🎤</span>

        
            <div>
                <h3 className="font-bold text-lg">{name}</h3>
                <h4 className="text-gray-500">@{usuario}</h4>
            </div>
        </div>
            <p className="mt-2 text-gray-700">{contenido}</p>
            <div className="mt-4 flex gap-8">
                <button
                    className="mt-4 inline-flex items-center px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={handleCommentButton}
                >
                    💬 {comment}
                </button>
                
                <button
                    className="mt-4 inline-flex items-center px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={handleShareButton}
                >
                    🔁 {share}
                </button>

                <button
                    className="mt-4 inline-flex items-center px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={handleLikeButton}
                >
                    ❤️ {likes}
                </button>
                <button
                    className="mt-4 inline-flex items-center px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={handleSaveButton}
                >
                    ⏬ {save}
                </button>
                
                <span
                    title="Ver más"
                    className="mt-4 inline-flex items-center px-3 py-1 rounded hover:bg-gray-200"
                >👇</span>
            </div>
        </div>

    )
}