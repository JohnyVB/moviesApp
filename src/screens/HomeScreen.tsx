import React, { useContext, useEffect } from 'react';
import { ActivityIndicator, Dimensions, ScrollView, View } from 'react-native';
import { styles } from '../theme/globalSetting';
import { useMovies } from '../hooks/useMovies';
import { MoviePoster } from '../components/MoviePoster';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Carousel from 'react-native-snap-carousel';
import { HorizontalSlider } from '../components/HorizontalSlider';
import { Gradient } from '../components/Gradient';
import { getColor } from '../helper/getColor';
import { GradientContext } from '../context/GradientContext';


const { width: windowWidth } = Dimensions.get('window');

export const HomeScreen = () => {

    const { nowPlaying, popular, topRaded, upcoming, isLoading } = useMovies();
    const { top } = useSafeAreaInsets();
    const { setMainColors } = useContext(GradientContext);

    const getPosterColor = async ( index: number ) => {
        const movie = nowPlaying[index]
        const uri = `https://image.tmdb.org/t/p/w500${ movie.poster_path }`;
        const [ primary = 'green', secondary = 'orange' ] = await getColor(uri);
        setMainColors({ primary, secondary });
    }

    useEffect(() => {
        if (nowPlaying.length > 0) {
            getPosterColor(0)
        }
        
    }, [nowPlaying])

    if (isLoading) {
        return (
            <View style={ styles.activityIndicator }>
                <ActivityIndicator color="red" size={ 100 } />
            </View>
        )
    }

    return (

        <Gradient>
            <ScrollView>
                <View style={{marginTop: top + 20}}>
                    {/* Carrosel Principa */}
                    <View style={{ height: 440 }}>
                        <Carousel 
                            data={nowPlaying}
                            renderItem={ ({item}: any) => <MoviePoster movie={item}/> }
                            sliderWidth={ windowWidth }
                            itemWidth={ 300 }
                            inactiveSlideOpacity={ 0.9 }
                            onSnapToItem={ (index) => getPosterColor(index) } 
                        />
                    </View>

                    {/* Popular */}
                    <HorizontalSlider title="Popular" movies={popular} />

                    {/* Popular */}
                    <HorizontalSlider title="Top Rated" movies={topRaded} />

                    {/* Popular */}
                    <HorizontalSlider title="Upcoming" movies={upcoming} />
                </View>
            </ScrollView>
        </Gradient>

        
    )
}
