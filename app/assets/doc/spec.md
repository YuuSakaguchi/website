*Notes so standard, they'll last forever.*

> What I write is important to me. I want to be able to read it fifty years from now. A hundred years from now. So where do I go? Apple Notes? Google? Other private, short-lived, growth-oriented companies? No. What we need is something that _focuses_ on durability and **not** growth.

<br>


Standard Notes is a basic notes app that delivers only the essentials in note taking. Because of its simplicity and resistance to growth, users can count on:

- **A standard data format that allows portability and an extended lifetime**. The more complex and custom a notes app becomes, the more likely your data becomes locked in to that platform, and the more buggy and laggy the application becomes. Because Standard Notes focuses on the "standard" format of a note, this data format, along with respective user-facing applications, are easy to maintain, and can exist for decades without issue. This means a less nomadic lifestyle for note takers.
- **A set of cross platform applications that don't deteriorate over time**. Simply put, applications that are simple are simpler to maintain. Applications that aim to survive an apocalypse must adapt to a different style. Because of this focus on durability, you won't be forced to switch over to a new system every time developers of your favorite notes app decide to change everything around or just completely abandon the project. And because the data format is built on top of the [Standard File](https://standardfile.org) format, your Standard Notes data can be used with any app that supports your Standard File account.
- **High security and privacy**. Because Standard Notes uses the Standard File format, all your notes are encrypted on your device before being sent over the wire. This means that even if the server was hacked and all your data was stolen, the attacker would only see gibberish - only you can decrypt your notes with your password key. Also, Standard Notes applications do not use any analytics tracking services and will never require you to agree to any "Terms of Service".

## What makes the cut for note "basics"?

The basic form of a note is timeless: it has existed since the invention of paper. Most things we know about history is known through the journals of our ancestors.

**Standard Notes aims to simply translate the "journal" standard into its digital form. This means:**

- a basic note with a title and text
- basic tagging system that allows a note to belong to one or multiple tags
- the ability to search and filter notes based on tags or keywords

**Standard Notes also makes some modernization updates to bring the timeless note format into the modern age:**

- custom extensions that allow 3rd party functionality, like [Dropbox Sync](https://standardnotes.org/extensions) or [Publish to Blog](https://standardnotes.org/extensions)
- a Markdown supported editor

**And because data portability and durability are of utmost importance, all Standard Notes clients support:**

- exporting all data as a human readable file
- importing data from a previously exported file

# Getting Started

To get started, download a Standard Notes app for your platform.

- [Web](https://app.standardnotes.org)
- [iOS](https://itunes.apple.com/us/app/id1191215138?mt=8)
- [Mac](https://github.com/standardnotes/desktop/releases/download/v0.1.2/Standard.Notes-Mac-0.1.2.dmg)
- [Windows](https://github.com/standardnotes/desktop/releases/download/v0.1.2/Standard.Notes.Windows.Setup.0.1.2.exe)
- [Linux](https://github.com/standardnotes/desktop/releases/download/v0.1.2/Standard-Notes-Linux-0.1.2-x86_64.AppImage)
- Android (In development)

Then, you'll choose a Standard File server to host your data:

- https:<span></span>//n3.standardnotes.org (default)
- https:<span></span>//n1.standardnotes.co.uk (in development, not yet available)

Note that you should not visit these URLs directly, but instead enter them into the app in the "server" field.

*Note: because your data is encrypted before being sent to the server, it is not necessarily important to "trust" these servers. This means you can choose any server and rest assured that your data is secure.*

If you're tech savvy, you can even [host your own Standard File server](https://github.com/standardfile/ruby-server/wiki/Deploying-a-private-Standard-File-server-with-Amazon-EC2-and-Nginx).

You'll enter this server information inside the Standard Notes application. You'll then be able to sign in or register on this server.

# Extensions

To keep the core application as simple and as uncluttered as possible, Standard Notes allows for the installation of arbitrary extensions. These extensions are URL based, and anyone can build an extension.

Extensions are simple yet extremely powerful. Extensions allow for things like:
- 3rd party data sync
- Revision control
- Publishing your notes to your blog

All of this and more is possible with extensions.

For example, you may want your notes and tags to be synced to your Dropbox for added redundancy and peace of mind. Extensions make this really easy.

For a list of available extensions, see [extensions](/extensions).

# Open Source
All Standard Notes apps are [open source](https://github.com/standardnotes). This means anyone can inspect the code and make sure it's not doing anything you wouldn't want it to do. And because the Standard Note format is openly published, anyone can build their own Standard Notes app. This means that you're not locked in to using our own suite of Standard Notes applications. This also means the lifetime of your notes is not limited by the lifetime of the Standard Notes application suite.

It's not something we consider often, but odds are, you as a human will outlive most of the private services you rely on today to manage your data. By building on top of a more open format, Standard Notes users don't have to worry about what would happen if Standard Notes got run over by a bus.

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
As little as possible, if at all. Our apps do not use any data analytics libraries like Google Analytics, which help track your behavior and present you with more relevant advertisements. Instead, we plan to do things the old fashioned way: opt-in email surveys, which we hope you'll respond to. Surveys will ensure we're building the right thing and help us understand how people are using the Standard Notes apps.

(At present one small exception exists, which is Crashlytics for the Standard Notes iOS app. This tool helps us understand when and why the app crashes. We plan to remove this as soon as we're confident of the app's stability.)

In addition, Standard Notes will never require you to agree to a lengthy terms of conditions.

# FAQ

**Is Standard Notes a non-profit?**
<br>
We're...not sure yet. On the one hand, we don't want to beg for donations to survive. On the other hand, we don't want more money than needed to sustain. One thing is certain however: we will be either a non-profit or public benefit corporation.

**How do you know you'll be here for a while?**
<br>
What makes software difficult to maintain is a growing feature set that constantly introduces a myriad of bugs and stability issues. Because we're committed to "freezing" our feature set as-is, the only maintenance work required is OS level compliance updates every year. While this is still a non-zero amount of work, it is far more manageable than a typical software project that aims to grow and grow every year. Because we're also not interested in "scaling", our costs should remain relatively low and allow us to sustain these applications for an extended period of time, if not indefinitely.

**How can I get involved?**
<br>
We love community contributions. If you're a notes-enthusiast, share with your friends and followers, and help create a more sustainable notes environment. If you're a developer, check out our [repositories](https://github.com/standardnotes) on Github and see where you can help. You can also host your own Standard File server for other community members to use and join. If you launch your own community server, [let us know](mailto:standardnotes@bitar.io).

You can also join the [Standard Notes Slack group](https://slackin-ekhdyygaer.now.sh/) to get involved.

**How can I get in touch?**
<br>
You can follow us on [Twitter](https://twitter.com/standardnotes) for updates and announcements. Or say hello at [standardnotes@bitar.io](mailto:standardnotes@bitar.io).
