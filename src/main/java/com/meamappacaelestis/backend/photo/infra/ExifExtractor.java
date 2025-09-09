package com.meamappacaelestis.backend.photo.infra;

import com.drew.imaging.ImageMetadataReader;
import com.drew.imaging.ImageProcessingException;
import com.drew.lang.Rational;
import com.drew.metadata.Metadata;
import com.drew.metadata.exif.ExifIFD0Directory;
import com.drew.metadata.exif.ExifSubIFDDirectory;
import com.drew.metadata.exif.GpsDirectory;

import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

import static com.drew.metadata.exif.ExifSubIFDDirectory.*;

public class ExifExtractor {

    public static ParsedMeta parse(InputStream in) throws ImageProcessingException, IOException {
        Metadata metadata = ImageMetadataReader.readMetadata(in);

        ExifSubIFDDirectory sub = metadata.getFirstDirectoryOfType(ExifSubIFDDirectory.class);
        ExifIFD0Directory ifd0 = metadata.getFirstDirectoryOfType(ExifIFD0Directory.class);
        GpsDirectory gps = metadata.getFirstDirectoryOfType(GpsDirectory.class);

        Double focalMm = null, exposureS = null, apertureF = null, exposureB = null;
        Integer iso = null, whiteBalance = null;
        LocalDateTime captureAt = null;
        Double lat = null, lon = null;
        String cameraMake = null, cameraModel = null;

        if (sub != null) {
            if (sub.containsTag(TAG_FOCAL_LENGTH)) {
                focalMm = sub.getDoubleObject(TAG_FOCAL_LENGTH);
            }

            if (sub.containsTag(TAG_ISO_EQUIVALENT)) {
                iso = sub.getInteger(TAG_ISO_EQUIVALENT);
            }

            if (sub.containsTag(TAG_FNUMBER)) {
                apertureF = sub.getDoubleObject(TAG_FNUMBER);
            }

            if (sub.containsTag(TAG_EXPOSURE_BIAS)) {
                exposureB = sub.getDoubleObject(TAG_EXPOSURE_BIAS);
            }

            if (sub.containsTag(TAG_WHITE_BALANCE)) {
                whiteBalance = sub.getInteger(TAG_WHITE_BALANCE);
            }

            if (sub.containsTag(TAG_EXPOSURE_TIME)) {
                Rational r = sub.getRational(TAG_EXPOSURE_TIME);
                if(r != null) exposureS = r.doubleValue();
            }

            if (sub.containsTag(TAG_DATETIME_ORIGINAL)) {
                Date d = sub.getDateOriginal();
                if(d != null) captureAt = d.toInstant().atZone(ZoneId.systemDefault())
                        .toLocalDateTime();
            }
        }

        if (gps != null && gps.getGeoLocation() != null) {
            lat = gps.getGeoLocation().getLatitude();
            lon = gps.getGeoLocation().getLongitude();
        }

        if (ifd0 != null) {
            if (ifd0.containsTag(TAG_MAKE)) {
                cameraMake = ifd0.getString(TAG_MAKE);
            }

            if (ifd0.containsTag(TAG_MODEL)) {
                cameraModel = ifd0.getString(TAG_MODEL);
            }
        }

        return new ParsedMeta(focalMm, iso, exposureS, apertureF, exposureB, whiteBalance, captureAt, lat, lon, cameraMake, cameraModel);
    }
}
