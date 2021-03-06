# Developer Analytics for Adaptive Streaming
## Monitor the quality of your service in realtime and spot errors before your users do!

![Alt](https://github.com/bitmovin/bitmovin-analytics-sdk/raw/master/analytics-infrastructure.png "Bitmovin Analytics")

## Why Bitmovin Analytics?
An API driven video analytics system built by developers for developers. Get realtime insights into user behaviour, video player performance and much more. Improve the experience, and reduce errors.

- See data in Realtime
- Monitor load times, buffering, adaptation behavior
- Easily investigate how users are watching your content
- REST-API to query your raw data
- Analyze individual sessions for debugging
- Designed for adaptive streaming (HLS and MPEG-DASH)
- A/B testing support
- Create webhooks and notifications
- Custom fields and dimensions for filters
- Integrates easily into existing workflows

## Technical Specifications
### Metrics

- Impressions
- Users
- Content Engagement
- Startup delay
- Player load time
- Location
- Errors


### Device information
- Browser
- Operating system
- Device type
- Screen dimensions
- Language

### Video metrics
- Scale factor
- Quality
- Resolution
- Streaming Protocol
- Live vs VoD

### Viewing behaviour
- Completion Rate
- Bounce Rate
- Rewatches

### Filters
All the metric dimensions listed above cannot only be queried but used for filtering results too, e.g. list impressions which are from the United States, watched the videos to a minimum of 50% and experienced a startup delay of maximum 1 second.

### JavaScript API Client
Size: 6KB
Can be integrated with any player

## Samples in this Repository

This Repository contains instructions and code samples on how to use and integrate Bitmovin Analytics into your system.
For a detailed tutorial and getting started guide please look at the [Bitmovin Analytics Tutorial][4]

[simple.html][1] demonstrates how simple it is to integrate the Bitmovin Analytics data collector on your site so it collects Data about the player.

For a demo and code sample of how you can query the collected Analytics Data (in realtime) please look at the [index.html][2] alongside the actual code inside [realtime.js][3].

[1]: https://github.com/bitmovin/bitmovin-analytics-sdk/blob/master/simple.html
[2]: https://github.com/bitmovin/bitmovin-analytics-sdk/blob/master/index.html
[3]: https://github.com/bitmovin/bitmovin-analytics-sdk/blob/master/realtime.js
[4]: https://github.com/bitmovin/bitmovin-analytics-sdk/blob/master/BitmovinAnalyticsTutorial.pdf
