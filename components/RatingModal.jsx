'use client'
import { Star, XIcon } from 'lucide-react';
import React, { useState } from 'react'
import { useAuth } from '@clerk/nextjs';
import { useDispatch } from 'react-redux';
import { saveRating } from '@/lib/features/rating/ratingSlice';
import toast from 'react-hot-toast';

const RatingModal = ({ ratingModal, setRatingModal }) => {

    const { getToken } = useAuth();
    const dispatch = useDispatch();
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');

    const handleSubmit = async () => {
        if (rating === 0) {
            throw new Error('Please select a level of Grace');
        }
        if (review.length < 5) {
            throw new Error('Please share a bit more about your experience');
        }

        const ratingData = {
            rating,
            review,
            productId: ratingModal.productId,
            orderId: ratingModal.orderId
        };

        const result = await dispatch(saveRating({ getToken, ratingData }));
        
        if (saveRating.fulfilled.match(result)) {
            setRatingModal(null);
            return "Experience shared with Grace";
        } else {
            throw new Error(result.payload || "Failed to share experience");
        }
    }

    return (
        <div className='fixed inset-0 z-[1000] flex items-center justify-center bg-rose-950/20 backdrop-blur-sm animate-reveal'>
            <div className='bg-white p-10 rounded-[3rem] shadow-[0_30px_100px_-15px_rgba(244,63,94,0.15)] w-[450px] relative border border-rose-100/50'>
                <button 
                    onClick={() => setRatingModal(null)} 
                    className='absolute top-8 right-8 text-rose-300 hover:text-rose-600 transition-colors'
                >
                    <XIcon size={24} />
                </button>

                <div className='space-y-8'>
                    <div className='space-y-2'>
                        <h2 className='text-3xl font-black text-rose-950 italic tracking-tighter'>Share Your <span className='text-rose-500'>Grace</span>.</h2>
                        <p className='text-[10px] uppercase tracking-[0.3em] font-black text-rose-300/60'>Artisan Experience Review</p>
                    </div>

                    <div className='flex items-center justify-center gap-2 py-6 bg-rose-50/50 rounded-3xl border border-rose-100/30'>
                        {Array.from({ length: 5 }, (_, i) => (
                            <Star
                                key={i}
                                className={`size-10 cursor-pointer transition-all duration-300 transform hover:scale-110 ${rating > i ? "text-amber-400 fill-current shadow-amber-200" : "text-rose-100"}`}
                                onClick={() => setRating(i + 1)}
                            />
                        ))}
                    </div>

                    <div className='space-y-4'>
                        <p className='text-[10px] font-black uppercase tracking-[0.3em] text-rose-300/40'>Testimonial of Elegance</p>
                        <textarea
                            className='w-full p-6 bg-rose-50/30 border border-rose-100/50 rounded-3xl outline-none focus:ring-2 focus:ring-rose-500/20 transition-all text-slate-700 font-medium italic placeholder:text-rose-200 resize-none'
                            placeholder='Describe your ethereal encounter...'
                            rows='4'
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                        ></textarea>
                    </div>

                    <button 
                        type="button"
                        onClick={e => toast.promise(handleSubmit(), { 
                            loading: 'Preserving Grace...',
                            success: (msg) => msg,
                            error: (err) => err.message
                        })} 
                        className='premium-button w-full py-5 text-sm font-black uppercase tracking-[0.3em]'
                    >
                        Submit Experience
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RatingModal