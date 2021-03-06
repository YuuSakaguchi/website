> What I write is important to me. I want to be able to read it fifty years from now. A hundred years from now. So where do I go? Apple Notes? Google? Other private, short-lived, growth-oriented companies? No. What we need is something that _focuses_ on durability and **not** growth.

# The Standard Notes Way
Standard Notes is a basic notes app that delivers only the essentials in note taking. Because of its simplicity and resistance to growth, users can count on:

- **An app that won't deteriorate over time**. How often are you forced to switch to a new system every time developers of your favorite app decide to change everything around or just completely abandon the project? Applications that aim to survive an apocalypse must adapt to a different lifestyle. We follow principles that maximize longevity, not growth, period.

- **A standard data format that allows portability and an extended lifetime**. The more complex and custom an app becomes, the more buggy it is, and the more likely your data becomes locked in to that platform. Focusing on the "standard" format of a note allows our applications to be easy to maintain, and aim to exist for decades without issue. This means a less nomadic lifestyle for note takers. And because the data format is built on top of the [Standard File](https://standardfile.org) format, your data can be used with any app that supports your Standard File account.

- **High security and privacy**. Because Standard Notes uses the Standard File format, all your notes are encrypted on your device before being sent over the wire. This means that even if the server was hacked and all your data was stolen, the attacker would only see gibberish - only you can decrypt your notes. Standard Notes applications also do not use any analytics tracking services and will never require you to agree to a lengthy "Terms of Service".

# What makes the cut for note "basics"?

The basic form of a note is timeless: it has existed since the invention of paper. Most things we know about history is known through the journals of our ancestors.

Standard Notes aims to simply translate the "journal" standard into its digital form. This means:

- a basic note with a title and text
- basic tagging system that allows a note to belong to one or multiple tags
- the ability to search and filter notes based on tags or keywords

While we like to keep it simple, we do like nice things too. Standard Notes allows for 3rd party extensions, such as:

- [Dropbox Sync](/extensions)
- [Note History](/extensions/revision-history)
- [Markdown Editors](/extensions)
- [File Attachments](/extensions)

And because data portability and durability are of utmost importance, Standard Notes allows you to easily:

- export all data as a human readable file
- import data from a previously exported file

# Getting Started

To get started, download a Standard Notes app for your platform.

- [Web](https://app.standardnotes.org)
- [iOS](https://itunes.apple.com/us/app/id1191215138?mt=8)
- [Mac](https://github.com/standardnotes/desktop/releases/download/v0.2.5/standard-notes-0.2.5-mac.zip)
- [Windows](https://github.com/standardnotes/desktop/releases/download/v0.2.5/standard-notes-Setup-0.2.5.exe)
- [Linux](https://github.com/standardnotes/desktop/releases/download/v0.2.5/standard-notes-0.2.5-x86_64.AppImage)
- Android ([In development](https://github.com/standardnotes/android))

Then, you'll choose a Standard File server to host your data:

- https:<span></span>//n3.standardnotes.org (default)
- https:<span></span>//n1.standardnotes.co.uk (in development, not yet available)

You shouldn't visit these URLs directly, but instead enter them into the app in the "server" field.

*Note: because your data is encrypted before being sent to the server, it is not necessarily important to "trust" these servers. This means you can choose any server and rest assured that your data is secure.*

If you're tech savvy, you can even [host your own Standard File server](https://github.com/standardfile/ruby-server/wiki/Deploying-a-private-Standard-File-server-with-Amazon-EC2-and-Nginx).

# Extensions

To keep the core application as simple and as uncluttered as possible, Standard Notes allows for the installation of 3rd party extensions.

Extensions are simple yet extremely powerful. Extensions allow for things like:
- 3rd party data sync, like Dropbox or Google Drive
- Revision control
- Custom editors, like Markdown or Latex
- Publishing your notes to your blog

For a list of available extensions, see [extensions](/extensions).

# Open Source
All Standard Notes apps are [open source](https://github.com/standardnotes). This means anyone can inspect the code and make sure it's not doing anything you wouldn't want it to do. And because the Standard Note format is openly published, anyone can build their own Standard Notes app. This means that you're not locked in to using our own suite of Standard Notes applications. This also means the lifetime of your notes is not limited by the lifetime of the Standard Notes application suite.

It's not something we consider often, but odds are, you as a human will outlive most of the private services you rely on today to manage your data. By building on top of a more open format, Standard Notes users don't have to worry about what would happen if Standard Notes got run over by a bus.

## Developers
If you're a developer, see [Standard Notes Developer Resources](/developers).

# The Standard Notes format
The data format for Standard Notes is dead simple, and relies on two main "structures", Notes and Tags. A structure is defined by the Standard File format [here](https://standardfile.org/#models). The Note and Tag structures below are custom to Standard Notes, however, we propose that anyone building a notes app on top of Standard File use or build on this same structure.

### [](#notes)Notes

Note structures have the following properties:

| name | type | description |
| --- | --- | --- |
| title | String | The title of the note. |
| text | String | The text body of the note. |

### [](#tags)Tags

Tag structures have the following properties:

| name | type | description |
| --- | --- | --- |
| title | String | The title of the tag. |

# Technical FAQ
**What information does Standard Notes collect about me?**
<br>
As little as possible, if at all. Our apps do not use any data analytics libraries like Google Analytics, which track your behavior online and sell it to advertisers. Instead, we plan to do things the old fashioned way: optional surveys, whether through email or Twitter. In addition, Standard Notes will never require you to agree to a lengthy terms of service.

# FAQ

**Is Standard Notes a non-profit?**
<br>
We're...not sure yet. On the one hand, we don't want to beg for donations to survive. On the other hand, we don't want more money than needed to sustain. One thing is certain however: we will be either a non-profit or public benefit corporation.

**How does Standard Notes make money?**
<br>
Excellent question — what are our incentives? Our incentives are simple: 1. Develop a cross-platform notes app that respects privacy and follows principles that maximize longevity. 2. Sustain the app and team, allowing us to continue doing what we love.

We're currently trying the [Standard Notes Extended](/extended) subscription, which provides subscribers with some benefits, like access to Advanced extensions (like the Note History extension and the Advanced Markdown Editor), and priority support with setting up a personal Standard Notes/Standard File server or Standard Notes based personal blog.

**How do you know you'll be here for a while?**
<br>
What makes software difficult to maintain is a growing feature set that constantly introduces a myriad of bugs and stability issues. Because we're committed to "freezing" our feature set as-is, the only maintenance work required is OS level compliance updates every year. While this is still a non-zero amount of work, it is far more manageable than a typical software project that aims to grow and grow every year. Because we're also not interested in "scaling", our costs should remain relatively low and allow us to sustain these applications for an extended period of time, if not indefinitely.

**How can I get involved?**
<br>
We love community contributions. If you're a notes-enthusiast, share with your friends and followers, and help create a more sustainable notes environment. If you're a developer, check out our [repositories](https://github.com/standardnotes) on Github and see where you can help. You can also host your own Standard File server for other community members to use and join. If you launch your own community server, [let us know](mailto:hello@standardnotes.org).

If you're a developer, see the [Developer Resources](/developers) pages.

You can also join the [Standard Notes Slack group](https://slackin-ekhdyygaer.now.sh/) to get involved.

**How can I get in touch?**
<br>
You can follow us on [Twitter](https://twitter.com/standardnotes) for updates and announcements. Or say hello at [hello@standardnotes.org](mailto:hello@standardnotes.org).
