# Hack the North Frontend Challenge 2022

### Building

To build & view:
```
npm install
npm run build

npm install -g serve
serve -s build
```

### Development

To edit with live refreshing:

```
npm install
npm run start
```


### 1. Walk us through your development process as you worked on this project. How did you plan out the structure and design of it? How did decide on the tools you've used? Did you encounter any problems? And if so, how did you solve them? Are there any areas of your code that you're particularly proud of or want to point out?

#### How did you plan out the structure and design of it?


For my development process I always start with laying out an MVP (Minimum Viable Product) and thinking about what is most critical to the user. For this project I assessed a linear display of sorted events to be the most critical. Without the sorted list of events, users will have a hard time finding the events they want and keeping up to date with what events have already happened and which events are coming up. Pictures, buttons, fancy scrolling, and the rest could come later.
After determining the set of features that were the absolute minimum, I cut tickets on a Trello board so I could track my progress and time box features/bugs that were taking too long. This had the added benefit of allowing me to record feature ideas and bugs as I was building the MVP and putting them in the TODO column. This way when I was done with the MVP I had a prioritized list of what to do next.

The resulting MVP:
![out](https://user-images.githubusercontent.com/15067287/154404920-e422a80a-b954-484c-83d6-0acee9d5954b.png)


#### How did decide on the tools you've used? 

The tools I used were Typescript, React, and SCSS. I used Material UI as a UI framework which allowed me to have a very consistent feel along with animations that I didn't have to spend hours writing. Typescript ended up being a good technical choice because it allowed me to catch a lot of errors that javascript wouldn't. Since Javascript will fail silently quite often with undefined and allow mismatched types. I actually had a case when I had an incorrect schema in an array once and typescript let me know that I was missing a field, which was really helpful! React was great for the regular reasons: good compartmentalization, code reusability, and state management. It allowed me to iterate quickly and build out a UI and UX with lots of functionality.

#### Did you encounter any problems? And if so, how did you solve them?

One of the problems I had came from trying to improve the linear design of the events. I figured that users would not find it very pleasing to have all the events in 1 column, so I set out to build a multi-column approach that also dynamically placed event cards where they should appear based on their start time and duration. The issue with this was that there are 24 hours in a day so each day would have to take up 300vh, and that just wasn't feasible. Google Calendar's solution to this is just to show the title only of each event, but if I was to convert to that solution I would essentially be building out many of the features of Google Calendar as well. So I decided to halt development on that feature to complete the project in a timely manner. It wasn't all lost though, because in an effort to build that feature I had written a groupByDay query as well as a groupByStartTime query which I was able to use in my final design! 

In terms of more technical problems that I solved, there were regular bugs here and there. What typescript didn't catch I would debug by isolating the unknowns by turning features off and using breakpoints around the code that's functioning status was still unknown.

#### Are there any areas of your code that you're particularly proud of or want to point out?

There are a few areas I am particularly proud of. First off, I am proud of the extensibility of the project. You can add [n] many event types with ease, as well as [n] many speakers and event days (the sample API responses had 3 days of events). Adding events is easy and takes 1 line of code in a theme.scss file where you can control the styles for the entire project.

<GIF>
 
I am also proud of the ability to collapse days and query by event type. I think this takes the project farther from a proof of concept and closer to a functional application that users can garner real value from. This is especially relevant to the Hack the North Gear Up event for example, as the same project can be used for that event and the main hackathon.
 
 Collapsing by day:
![htn_group](https://user-images.githubusercontent.com/15067287/154404632-77a0916c-e87f-46da-ac26-7b89299cece7.gif)

Filtering by event type:
![htn_filter](https://user-images.githubusercontent.com/15067287/154404665-31079439-d679-4ef9-8418-f3973ec6045a.gif)

 
The final thing I am proud of is my login wall for private events. I took inspiration from applications such as private youtube videos or Netflix and tried to implement an intuitive design that communicated to users that they would need to sign in to view those events. This way I can try and minimize user documentation and work off a user's existing knowledge/expectations from other web applications.
 
![htn_login](https://user-images.githubusercontent.com/15067287/154404453-736fb96a-244e-4598-92eb-7dd167688667.gif)


### 2. Given additional time, how would you extend your application to become a fully functional product that thousands of hackers and the general public would use at Hackathon Global Inc.™'s next event? Would you add more features and performance metrics? If so, what would they be?

If was given more time to work on this I definitely would have added querying by text. It's not that I couldn't do it, but it just didn't make the cut for me in terms of timing since I wanted to focus on what was most critical to users. In a large-scale application such as Hack the North’s real calendar application there are tons of events and at that point, I see real value in being able to search up an event easily so I would implement that to improve the UX. Additionally, I would implement the more Google Calendar style UI that I mentioned in question 1. I had a go at it, but there were just too many edge cases to fit it all into this project. However, I feel like this is the most intuitive way for users to interact with a calendar and that it would be well worth the effort when 3000 people are going to be visiting this page multiple times. 

The metrics I would be most concerned about are errors, bounces, and load times. Errors since if part of the UI could enter a broken state I would want to fix it immediately. You can beta test forever, but the true test is when 3000 people use the application all at once. Second, I would want to know about bounces. I think this would be a good indication of the use or usefulness of the calendar application and it will be helpful next year to determine what kind of traffic and sustained usage the page is getting. Finally, load times are critical to me. Users are running on all kinds of hardware with all kinds of internet connections and ensuring accessibility for the largest amount of users is paramount in my priorities when building frontend applications. If someone is having trouble loading your application, there is no point in writing the application before you solve that problem first. Google has reported that after 5 seconds of load time, 80% of users bounce from the page (can’t find the citation, but this [blog](https://www.websitebuilderexpert.com/building-websites/website-load-time-statistics/#:~:text=Google's%20research%20showed%20that%20the,a%20bounce%20increases%20to%20123%25) says it so it must be true!)

### 3. Any other thoughts you have (not limited to the previous questions).

#### Is the code written and documented such that a developer who is unfamiliar with the code can understand it relatively quickly?


When laying out the codebase I opted to use the general project structure that I have seen at previous companies I have worked at (Wealthsimple, Magnet Forensics) which both used react. This also happens to be the structure that react-scripts uses as well. This way developers know what to look for and where to look for it. I also packaged components and their styles together so that if you need to change how a component looks, the .scss file you need is right there in the same directory and you don't have to go hunting around for it in some styles folder.

I tried my best to write self documentating code with descriptive variable names, function names, and self-explanatory loop structures. A wise developer once said "the best code has very few comments", and I believe that. I added comments for things that confused me or that I thought were more high-level and needed explaining. This way the code remains concise and understandable given a base level of knowledge I expect from the developer.


#### Is your project structured in a way that is extensible and scalable? For example, if we wanted to add more events or event types, would it be possible to do so easily?

 Adding more event types is actually something I talked about in question 1! It is a 3 line change, literally. In theme.scss you add `event-${event-type}` and what color you want, then you are good to go. The component library I wrote will automatically map the events it gets from the API to when your style and auto-generate the checkboxes for filtering by the new event type. If someone forgets to add the color style, the HTML and JS will still function as it should, your event will just have a white background instead of something more descriptive to the user.

#### Are you following best practices to make sure the project is maintainable if development were to continue on it?

I used ESLint to conform to a widely accepted style standard with 0 warnings and 0 errors, and I believe this would make the project maintainable in the future if different developers started to work on the codebase. Additionally, I compartmentalized many of the features into components to reduce cognitive load. If you want to change the EventCard, you only need to look at the EventCard.

#### Is your application accessible and responsive (usable on multiple device types and/or for individuals with impairments)?

100%! I have tested it on mobile as well as various resolutions on both laptops and monitors. There are multiple breakpoints to ensure the design remains usable and pleasant. I tried to use bold colours, but the event-type colours may cause issues for colorblind users and that's something I would spend more time on if this project had an extended timeline.

> Is the styling and appearance of your application consistent and appealing?

I believe so. I tried to follow Material UI closely so that nothing looked awkward. I think the placement of cards like the Speaker Card or the Play button could have been better. This is another area I would have spent more time on with an extended timeline. I opted for functionality over trial and error with a million different possible layouts :) (Although, I did still try quite a few…)

