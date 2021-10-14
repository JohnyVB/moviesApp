import React from 'react';
import { ActivityIndicator, Dimensions, FlatList, ScrollView, View } from 'react-native';
import { styles } from '../theme/globalSetting';
import { useMovies } from '../hooks/useMovies';
import { MoviePoster } from '../components/MoviePoster';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Carousel from 'react-native-snap-carousel';
import { HorizontalSlider } from '../components/HorizontalSlider';


const { width: windowWidth } = Dimensions.get('window');

export const HomeScreen = () => {

    const {nowPlaying, popular, topRaded, upcoming, isLoading} = useMovies();
    const { top } = useSafeAreaInsets();

    if (isLoading) {
        return (
            <View style={ styles.activityIndicator }>
                <ActivityIndicator color="red" size={ 100 } />
            </View>
        )
    }

    return (
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
    )
}
