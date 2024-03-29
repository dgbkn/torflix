
import 'vidstack/styles/defaults.css'
import 'vidstack/styles/community-skin/video.css'

// import { defineCustomElements } from 'vidstack/elements';
// defineCustomElements();

import { MediaCommunitySkin, MediaOutlet, MediaPlayer, MediaPoster } from '@vidstack/react';



export default function VidStackPlayer({ title = "", src = "https://stream.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/low.mp4" }) {
    return (
        <div ><MediaPlayer
            load='eager'
            autoplay={true}
            title={title}
            aspectRatio={16 / 9}
            src={[{ src: src, type: 'video/mp4' },
            ]}
            // src={src}
        >
            <MediaOutlet>
                {/* <media-poster
                    alt="Girl walks into sprite gnomes around her friend on a campfire in danger!"
                ></media-poster> */}

            </MediaOutlet>
            <MediaCommunitySkin ></MediaCommunitySkin>
        </MediaPlayer>
        </div>
    )
}
