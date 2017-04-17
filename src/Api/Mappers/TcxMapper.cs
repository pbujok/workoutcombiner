using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using Domain.DataFormats;
using Domain.WorkoutMerge;
using Api.Models;
using Domain.WorkoutMerge.Utils;

namespace Domain.Mappers
{
    public class TcxMapper
    {
        public TrainingCenterDatabase ToTcx(Workout workout)
        {
            return new TrainingCenterDatabase()
            {
                Activities = new List<Activity>
                {
                    new Activity
                    {
                        Id = workout.Id,
                        Sport = workout.Segments.FirstOrDefault()?.Sport,
                        Laps = MapLapsToTcx(workout.Segments)
                    }
                }
            };
        }

        private List<Lap> MapLapsToTcx(List<Segment> segments)
        {
            var laps = new List<Lap>();
            foreach(var segment in segments)
            {
                laps.Add(new Lap
                {
                    Calories = segment.Calories.Value,
                    DistanceMeters = segment.DistanceMeters,
                    Intensity = (Intensity)Enum.Parse(typeof(Intensity), segment.Intensity),
                    TotalTimeSeconds = (float)segment.TotalTimeSeconds.Value,
                    StartTime = segment.StartTime,
                    TriggerMethod = (TriggerMethod)Enum.Parse(typeof(TriggerMethod), segment.TriggerMethod),
                    Track = MapTrackPointsToTcx(segment.Track).ToList()
                });
            }
            return laps;
        }

        private IEnumerable<Trackpoint> MapTrackPointsToTcx(ReadOnlyCollection<TrackItem> track)
        {
            foreach(var item in track)
            {
                var trackpoint = new Trackpoint();

                if (item.Altitude.HasValue)
                    trackpoint.AltitudeMeters = (float)item.Altitude.Value;
                if (item.Cadence.HasValue)
                    trackpoint.Cadence = item.Cadence.Value;
                if (item.Coordiantes.HasValue)
                    trackpoint.Position = new Position() {
                        LatitudeDegrees = (float)item.Coordiantes.Latitude,
                        LongitudeDegrees = (float)item.Coordiantes.Longtitude
                    };
                if (item.Distance.HasValue)
                    trackpoint.DistanceMeters = (float)item.Distance.Value;
                if (item.Pulse.HasValue)
                    trackpoint.HeartRateBpm = new HeartRateBpm(item.Pulse.Value);

                trackpoint.Time = item.Time;

                yield return trackpoint;
            }
        }

        public Workout MapToDomain(TrainingCenterDatabase tcx)
        {
            var segments = new List<Segment>();

            var activity = tcx.Activities.FirstOrDefault();
            foreach (var lap in activity.Laps)
            {
                segments.Add(
                    new Segment(
                        activity.Sport,
                        lap.StartTime,
                        lap.Track.Select(MapToTrackItem).ToList(),
                        new Calories(lap.Calories),
                        IntensityValues.Active,
                        TriggerMethodValue.Manual
                        )
                    );
            }
            
            var workout = new Workout(segments, activity.Id);
            return workout;
        }

        private TrackItem MapToTrackItem(Trackpoint trackpoint)
        {
            var coordinates = MapToCoordinates(trackpoint);
            return new TrackItem(trackpoint.Time,
                coordinates,
                new Cadence(trackpoint.Cadence),
                new Pulse(trackpoint.HeartRateBpm?.Value),
                new Altitude(Convert.ToDecimal(trackpoint.AltitudeMeters)),
                new Distance(Convert.ToDecimal(trackpoint.DistanceMeters)));
        }

        private static Coordiantes MapToCoordinates(Trackpoint trackpoint)
        {
            decimal? lat = null;
            decimal? lon = null;

            if (trackpoint.Position != null)
            {
                lat = Convert.ToDecimal(trackpoint.Position.LatitudeDegrees);
                lon = Convert.ToDecimal(trackpoint.Position.LongitudeDegrees);
            }

            var coordinates = new Coordiantes(lat, lon);
            return coordinates;
        }
    }
}
