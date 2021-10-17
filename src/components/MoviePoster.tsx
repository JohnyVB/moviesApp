import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Movie } from '../interfaces/movieInterface';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '../navigation/NavigationController';

interface Props {
    movie: Movie;
    height?: number;
    width?: number;
}

type DetailScreenProp = StackNavigationProp<RootStackParams, 'DetailScreen'>

export const MoviePoster = ({ movie, height = 420, width = 300 }: Props) => {
    
    const uri = `https://image.tmdb.org/t/p/w500${ movie.poster_path }`;

    const navigation = useNavigation<DetailScreenProp>();
    
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('DetailScreen', movie)}
            activeOpacity={0.8} 
            style={{
                width,
                height,
                paddingBottom: 20,
                paddingHorizontal: 15
            }}
        >
            <View style={ styles.imageContainer}>
                <Image 
                    source={{
                        uri
                    }}
                    style={styles.poster}
                />
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    poster: {
        flex: 1,
        borderRadius: 10,
    },
    imageContainer: {
        flex: 1,
        borderRadius: 18,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.24,
        shadowRadius: 7,

        elevation: 10
    }
});
