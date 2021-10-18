import React from 'react';
import { Image, StyleSheet, View, Dimensions, ScrollView, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../navigation/NavigationController';

import { useMovieDetails } from '../hooks/useMovieDetails';
import { MovieDetails } from '../components/MovieDetails';

const { height: screenHeight } = Dimensions.get('screen');

interface Props extends StackScreenProps<RootStackParams, 'DetailScreen'>{};

export const DetailScreen = ({ route }: Props) => {

    const movie = route.params;
    const uri = `https://image.tmdb.org/t/p/w500${ movie.poster_path }`;


    const { isLoading, movieFull, cast} = useMovieDetails(movie.id);

    return (
        <ScrollView>
            <View style={ styles.imageContainer }>
                <View style={ styles.imageBorder }>
                    <Image 
                        source={{uri}}
                        style={styles.posterImage }
                    />
                </View>
            </View>

            <View style={ styles.marginContainer }>
                <Text style={ styles.subTitle }>{ movie.original_title }</Text>
                <Text style={ styles.title }>{ movie.title }</Text>
            </View>

            
            {
                isLoading
                    ? <ActivityIndicator size={ 35 } color="grey" style={{ marginTop: 20}} />
                    : <MovieDetails movieFull={ movieFull! } cast={ cast } />
            }
        
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    posterImage: {
        flex: 1,

    },
    imageContainer: {
        width: '100%',
        height: screenHeight * 0.7,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.24,
        shadowRadius: 7,

        elevation: 10,

        borderBottomStartRadius: 25,
        borderBottomEndRadius: 25
    },
    marginContainer: {
        marginHorizontal: 20,
        marginTop: 20
    },
    subTitle: {
        color: 'black',
        fontSize: 16,
        opacity: 0.8
    },
    title: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold'
    },
    imageBorder: {
        flex: 1,
        overflow: 'hidden',
        borderBottomStartRadius: 25,
        borderBottomEndRadius: 25
    }
});