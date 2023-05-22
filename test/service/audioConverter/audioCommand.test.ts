/*
* @audioCommand.test.ts Copyright(c) 2023 Jalasoft
* 2643 Av Melchor Perez de Olguin, Colquiri Sud, Cochabamba, Bolivia.
* Av.General Inofuentes esquina Calle20, Edificio Union No1376, La Paz, Bolivia
* All rights reserved
* This software is the confidential and proprietary information of
* Jalasoft,ConfidentialInformation"). You shall not
* disclose such Confidential Information and shall use it only in
* accordance with the terms of the license agreement you entered into
* with Jalasoft
*/

const dotenv = require('dotenv');
import { AudioCommand } from '../../../src/service/audioConverter/audioCommand';
import { Execute } from '../../../src/service/Execute';
dotenv.config();

describe ('This is the test suite for the Audio Converter service', () => {
    it ('Should return the command to execute', () => {
        const newAudioFile: string = 'DigitalLove.flac';
        const newAudioFileName: string = 'DigitalLove';
        const audioOutExtension: string = 'mp3';
        // Creates a new object audio for audio commands
        const audio = new AudioCommand();
        // Adds the input file with its address to convert
        audio.inputFile = `${process.env.UPLOADS_PATH_AUDIO}${newAudioFile}`;
        // Adds the extension of the wanted output file
        audio.outExtension = audioOutExtension;
        // Adds command to convert the bit rate of the input file
        audio.bitRate = '96k';
        // set duration to 60 seconds
        audio.duration = 60;
        // Creates the output path according to design
        const audioOutFilePath: string = `${process.env.DOWNLOAD_PATH_AUDIO}${newAudioFileName}.${audioOutExtension}`;
        // Sets the output path of the converted file
        audio.convertedFilePath = audioOutFilePath;
        // Gets the command to execute the desired action
        const command: string = audio.getCommand();
        // Converts the input file and returns the state of the conversion
        const expectedCommand = 'ffmpeg -i ./src/service/audioConverter/inputs/DigitalLove.flac -y -b:a 96k -t 60 ./src/service/audioConverter/outputs/DigitalLove.mp3';
        expect(command).toBe(expectedCommand);
    });
    it('Should execute the command and return a message for a successful convertion', async () => {
        const newAudioFile: string = 'Kamikaze.mp3';
        const newAudioFileName: string = 'Kamikaze';
        const audioOutExtension: string = 'mp3';

        // Creates a new object audio for audio commands
        const audio = new AudioCommand();
        // Creates an object for executing the commands that were sent
        const execute = new Execute();
        // Adds the input file with its address to convert
        audio.inputFile = `${process.env.UPLOADS_PATH_AUDIO}${newAudioFile}`;
        // Adds the extension of the wanted output file
        audio.outExtension = audioOutExtension;
        // Adds command to convert the bit rate of the input file
        audio.bitRate = '96k';
        // set duration to 60 seconds
        audio.duration = 60;
        // Creates the output path according to design
        const audioOutFilePath: string = `${process.env.DOWNLOAD_PATH_AUDIO}${newAudioFileName}.${audioOutExtension}`;
        // Sets the output path of the converted file
        audio.convertedFilePath = audioOutFilePath;
        // Gets the command to execute the desired action
        const command: string = audio.getCommand();
        // Converts the input file and returns the state of the conversion
        const result = await execute.command(command, audio.convertedFilePath);
        const outStout = 'Conversion Completed';
        expect(result.stdout).toBe(outStout);
    });

    it('Should return the path of the converted file after a successful conversion', async () => {
        const newAudioFile: string = 'DigitalLove.flac';
        const newAudioFileName: string = 'DigitalLove';
        const audioOutExtension: string = 'mp3';

        // Creates a new object audio for audio commands
        const audio = new AudioCommand();
        // Creates an object for executing the commands that were sent
        const execute = new Execute();
        // Adds the input file with its address to convert
        audio.inputFile = `${process.env.UPLOADS_PATH_AUDIO}${newAudioFile}`;
        // Adds the extension of the wanted output file
        audio.outExtension = audioOutExtension;
        // Adds command to convert the bit rate of the input file
        audio.bitRate = '96k';
        // set duration to 60 seconds
        audio.duration = 60;
        // Creates the output path according to design
        const audioOutFilePath: string = `${process.env.DOWNLOAD_PATH_AUDIO}${newAudioFileName}.${audioOutExtension}`;
        // Sets the output path of the converted file
        audio.convertedFilePath = audioOutFilePath;
        // Gets the command to execute the desired action
        const command: string = audio.getCommand();
        // Converts the input file and returns the state of the conversion
        const result = await execute.command(command, audio.convertedFilePath);
        const outPath = './src/service/audioConverter/outputs/DigitalLove.mp3';
        expect(result.outputPath).toBe(outPath);
    });
    it('Should execute the command without setting any parameter, just change the extension', async () => {
        const newAudioFile: string = 'Kamikaze.mp3';
        const newAudioFileName: string = 'Kamikaze2';
        const audioOutExtension: string = 'flac';

        // Creates a new object audio for audio commands
        const audio = new AudioCommand();
        // Creates an object for executing the commands that were sent
        const execute = new Execute();
        // Adds the input file with its address to convert
        audio.inputFile = `${process.env.UPLOADS_PATH_AUDIO}${newAudioFile}`;
        // Adds the extension of the wanted output file
        audio.outExtension = audioOutExtension;
        // Creates the output path according to design
        const audioOutFilePath: string = `${process.env.DOWNLOAD_PATH_AUDIO}${newAudioFileName}.${audioOutExtension}`;
        // Sets the output path of the converted file
        audio.convertedFilePath = audioOutFilePath;
        // Gets the command to execute the desired action
        const command: string = audio.getCommand();
        // Converts the input file and returns the state of the conversion
        const result = await execute.command(command, audio.convertedFilePath);
        const outStout = 'Conversion Completed';
        expect(result.stdout).toBe(outStout);
    });
    it ('Should return a valid command to execute, managing an empty value settled in bitRate', () => {
        const newAudioFile: string = 'DigitalLove.flac';
        const newAudioFileName: string = 'DigitalLove';
        const audioOutExtension: string = 'mp3';
        // Creates a new object audio for audio commands
        const audio = new AudioCommand();
        // Adds the input file with its address to convert
        audio.inputFile = `${process.env.UPLOADS_PATH_AUDIO}${newAudioFile}`;
        // Adds the extension of the wanted output file
        audio.outExtension = audioOutExtension;
        // Adds command to convert the bit rate of the input file
        audio.bitRate = '';
        // set duration to 60 seconds
        audio.duration = 60;
        // Creates the output path according to design
        const audioOutFilePath: string = `${process.env.DOWNLOAD_PATH_AUDIO}${newAudioFileName}.${audioOutExtension}`;
        // Sets the output path of the converted file
        audio.convertedFilePath = audioOutFilePath;
        // Gets the command to execute the desired action
        const command: string = audio.getCommand();
        // Converts the input file and returns the state of the conversion
        const expectedCommand = 'ffmpeg -i ./src/service/audioConverter/inputs/DigitalLove.flac -y  -t 60 ./src/service/audioConverter/outputs/DigitalLove.mp3';
        expect(command).toBe(expectedCommand);
    });
    it ('Should return a valid command to execute, managing a zero value settled in duration', () => {
        const newAudioFile: string = 'DigitalLove.flac';
        const newAudioFileName: string = 'DigitalLove';
        const audioOutExtension: string = 'mp3';
        // Creates a new object audio for audio commands
        const audio = new AudioCommand();
        // Adds the input file with its address to convert
        audio.inputFile = `${process.env.UPLOADS_PATH_AUDIO}${newAudioFile}`;
        // Adds the extension of the wanted output file
        audio.outExtension = audioOutExtension;
        // set duration to 60 seconds
        audio.duration = 0;
        // Creates the output path according to design
        const audioOutFilePath: string = `${process.env.DOWNLOAD_PATH_AUDIO}${newAudioFileName}.${audioOutExtension}`;
        // Sets the output path of the converted file
        audio.convertedFilePath = audioOutFilePath;
        // Gets the command to execute the desired action
        const command: string = audio.getCommand();
        // Converts the input file and returns the state of the conversion
        const expectedCommand = 'ffmpeg -i ./src/service/audioConverter/inputs/DigitalLove.flac -y   ./src/service/audioConverter/outputs/DigitalLove.mp3';
        expect(command).toBe(expectedCommand);
    });
    it ('Should return a valid command to execute, managing a negative value settled in duration', () => {
        const newAudioFile: string = 'DigitalLove.flac';
        const newAudioFileName: string = 'DigitalLove';
        const audioOutExtension: string = 'mp3';
        // Creates a new object audio for audio commands
        const audio = new AudioCommand();
        // Adds the input file with its address to convert
        audio.inputFile = `${process.env.UPLOADS_PATH_AUDIO}${newAudioFile}`;
        // Adds the extension of the wanted output file
        audio.outExtension = audioOutExtension;
        // set duration to 60 seconds
        audio.duration = -45;
        // Creates the output path according to design
        const audioOutFilePath: string = `${process.env.DOWNLOAD_PATH_AUDIO}${newAudioFileName}.${audioOutExtension}`;
        // Sets the output path of the converted file
        audio.convertedFilePath = audioOutFilePath;
        // Gets the command to execute the desired action
        const command: string = audio.getCommand();
        // Converts the input file and returns the state of the conversion
        const expectedCommand = 'ffmpeg -i ./src/service/audioConverter/inputs/DigitalLove.flac -y   ./src/service/audioConverter/outputs/DigitalLove.mp3';
        expect(command).toBe(expectedCommand);
    });
});
