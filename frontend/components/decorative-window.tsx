import React from 'react';
import { motion } from 'framer-motion';
import Typography from './typography';
import { colors } from '../app/__new/theme';
import { cn } from '../lib/utils';

const AudioEqualizer: React.FC = () => {
    return (
        <div className="flex items-end h-16 space-x-1">
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    className={cn("w-2", "bg-green-500")}
                    initial={{ height: '10%' }}
                    animate={{
                        height: ['10%', '100%', '10%'],
                    }}
                    transition={{
                        duration: 1 + i * 0.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
};


const DecorativeWindow: React.FC = () => {
    return (
        <div className={cn("hidden lg:block p-4 text-green-400 border-2 border-green-500/50")}>
            <div className="space-y-4">
                
                {/* Now Playing Section */}
                <div className="space-y-2">
                    <Typography variant="body" as="p" color="tertiary">:: NOW PLAYING ::</Typography>
                    <div className="flex items-center space-x-4">
                        <AudioEqualizer />
                        <div>
                             <Typography variant="h3" as="h2" color="white">Midnight Velocity</Typography>
                             <Typography variant="bodyLarge" as="p">CYBERDREAM</Typography>
                        </div>
                    </div>
                </div>

                <div className={cn("border-t-2 border-green-500 w-full my-4")}></div>

                <Typography variant="body" as="p">日本製1984年</Typography>

            </div>
        </div>
    )
}

export default DecorativeWindow;
