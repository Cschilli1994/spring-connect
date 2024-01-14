package com.zone.connect.entities.Game;

import java.util.Arrays;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class BoardToStringConverter implements AttributeConverter<Integer[][], String> {

    @Override
    public String convertToDatabaseColumn(Integer[][] board) {
        // TODO Auto-generated method stub

        String convertedData = "[";

        for (int i = 0; i < board.length; i++) {
            convertedData += Arrays.toString(board[i]);

            if (i < board.length - 1) {
                convertedData += ",";
            }
        }

        convertedData += "]";
        return convertedData;
    }

    @Override
    public Integer[][] convertToEntityAttribute(String dbData) {
        // TODO Auto-generated method stub

        ObjectMapper objMapper = new ObjectMapper();

        Integer[][] board = null;
        try {
            board = objMapper.readValue(dbData, Integer[][].class);
        } catch (JsonMappingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (JsonProcessingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return board;
    }
}
