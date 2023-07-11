# capstone-project

## Introduction

This is a repository containing the codebase from my senior capstone project at Iowa State University. It is a web application that was
developed by a team consisting of myself and 4 other seniors, working directly with our client (Dr. Stone Chen) to achieve all of his desired features
and tailor the layout and aesthetic to be exactly what he needed. The web application acts as both a storage container and place to edit SOPs (Standard Operating
Procedures), which are essentially lab manuals for the Molecular Biology Department at Iowa State. The need for the project arose from the fact that the department
had no standard format for the SOPs, and had a large number of them (100+) with no central place to store them. The project was developed over the course of a
semester (approximately 5 months) and was able to achieve all of the client's goals with the utmost satisfaction. As a team, we utilized the agile software
development methodology in order to stay organized and accomplish all of our tasks, along with standard Git features such as issues and branching. For more
information, feel free to check out our [project website](https://seniord.cs.iastate.edu/2023-Jan-11/).

## Technical Information

### Backend

For the backend of this project, we decided to utilize Google Drive and Google Docs as a way of storing and editing the SOPs. As the department had previously
had all of the SOP documents stored as Microsoft Word files, we found that importing them and converting them into Google Docs was the easiest way to be able
to maintain the formatting within the documents, which was a key feature desired by the client. In previous years, there had been 2 other groups who had attempted
to complete this project for the client, to varying degrees of success. While these previous groups were able to successfully develop a web application for the client
with a decent layout, they were unable to include the necessary features of being able to import and preserve the formatting of the documents or edit them correctly.
Additionally, the client had numerous complaints about the layout and design of each of these 2 previous projects, which we took into account in the design of our
own project. As such, the decision to utilize Google Drive and Google Docs for our version of the project was the most obvious choice and streamlined the process,
essentially providing the majority of our backend for us. Interacting with the Google suite required the use of the Google APIs, and so our backend is written in Go.
Our backend codebase is relatively small as a result, and should be quite simple to read and understand. The majority of the backend code is simply GraphQL queries
that can be called to retrieve the documents and their info, while the actual storage and handling of the documents is all taken care of by the Google suite. Most
of the backend code was written by 2 of the other group members, but I do have a sufficient understanding of the code as I was involved in a lot of the code written
for the frontend in order to interact with the backend. All of the backend code can be found under the folder labeled **backend**.

### Frontend

The vast majority of the creation of this project was developing the frontend. Although our client was not involved in the technical aspect of this process, they
provided a lot of feedback here in order for us to create an interface that best suited them. We utilized the React library to develop the frontend, which allowed
us to easily create a custom interface tailored to the client's wants and needs. We developed a multitude of reusable components for the project, which are
contained within the **components** folder in the frontend (which is located within the **src** folder). Under the **pages** folder, you will find the code for
each of the pages of the web application, each of which is pretty self-explanatory. More information is detailed in the [reports](https://seniord.cs.iastate.edu/2023-Jan-11/reports)
on our project website.

## How to Run
