import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import currencyFormatter from 'currency-formatter';

import { MovieFull } from '../interfaces/movieInterface';
import { Cast } from '../interfaces/creditsInterface';
import Icon from 'react-native-vector-icons/Ionicons';
import { ActorItem } from './ActorItem';

interface Props {
    movieFull: MovieFull;
    cast: Cast[];
}

export const MovieDetails = ({ movieFull, cast }: Props) => {
    return (
        <>
            <View style={{ marginHorizontal: 20 }}>

                <View style={{ flexDirection: 'row'}}>
                    <Icon
                        name="star-outline"
                        color="grey"
                        size={ 23 } 
                    />
                    <Text style={styles.title}> { movieFull.vote_average }</Text>

                    <Text style={{ ...styles.title, marginLeft: 5 }}>
                        - { movieFull.genres.map(g => g.name).join(', ')}
                    </Text>
                </View>

                {/* Sinopsis */}
                <Text style={{ color:'black', fontSize: 23, marginTop: 10, fontWeight: 'bold'}}>
                    Sinopsis
                </Text>

                <Text style={{ fontSize: 16 }}>
                    { movieFull.overview }
                </Text>

                {/* Presupuesto */}
                <Text style={{ color:'black', fontSize: 23, marginTop: 10, fontWeight: 'bold'}}>
                    Presupuesto
                </Text>

                <Text style={{ fontSize: 18}}>
                    { currencyFormatter.format( movieFull.budget, { code: 'USD' }) }
                </Text>

            </View>

            <View style={{ marginHorizontal: 20, marginBottom: 100 }}>
                <Text style={{ color:'black', fontSize: 23, marginTop: 10, fontWeight: 'bold'}}>
                    Actores
                </Text>
                {/* Casting */}
                
                
                <FlatList 
                    data={ cast }
                    keyExtractor={ (item) => item.id.toString() }
                    renderItem={ ({ item }) => <ActorItem actor={ item } />}
                    horizontal={ true }
                    showsHorizontalScrollIndicator={ false }
                    style={{ marginTop: 10, height: 70}}
                />
                
            </View>
            
        </>
    )
}


const styles = StyleSheet.create({
    title: {
        color: 'black',
        fontSize: 20
    }
});