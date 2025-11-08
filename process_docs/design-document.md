# Final Design Document

## Significant Changes from Original Design
1. **User Authentication**: As mentioned in previous reflections, I had originally failed to consider the need for any sort of user authentication. I have since added a simple username-based login system that allows users to create accounts and log in. While this is not as robust as a full authentication system with passwords and security measures, it does provide a basic level of user differentiation and allows for tracking of task additions by user.

2. **Task Dependency Management**: From my original design, I ended up with only "precedes" and "follows" as dependency relationships, excluding the "directly precedes" and "directly follows" relationships I had initially planned to include. This simplification was largely to simplify the logic and user interface, and I believe it still meets the core requirements effectively.

3. **Dedicated Pages**: In my original wireframes, I imagined dedicated pages for session handling and list creation. Instead, I ended up incorporating these functionalities into modals within the main views to improve user flow and reduce navigation complexity. I like this change, and I think it makes the overall experience smoother.

## Lingering Challenges
1. **Lost Descriptions**: As it stands, there is an issue where task descriptions are not consistently saved or displayed. I found this to be quite confusing as earlier versions even just today had no difficulty storing and displaying descriptions. Given the time constraints, I don't have time to debug this further, and while unfortunate, it does not undermine the overall functionality.

2. **Enforcement of Dependencies**: Currently, the system is enforcing task dependencies too harshly, preventing users from reordering tasks within a list where dependencies exist, even if this does not effect the dependency relationships. This, like the descriptions issue, is something that appeared recently while fixing other problems and had been working earlier. This is quite unfortunate, given its relevance to my overall design purpose, but I wasn't able to resolve it in time.

3. **Cycle Prevention**: Now, cycles are allowed to be added in the task bank, but the whole set of tasks can not be added to the same list. This is a bandaid solution, helping avoid crashes during randomization for a session, but not really addressing the key issue of cycle prevention.

## Final Reflections
Overall, I am pleased with the final implementation of the Task Tackler app. While there were some challenges and deviations from my original design, I believe the core functionality is intact and the app serves its intended purpose effectively. With this being my first experience in full-stack development, I have learned a lot and am ready to tackle the group project with a stronger foundation.