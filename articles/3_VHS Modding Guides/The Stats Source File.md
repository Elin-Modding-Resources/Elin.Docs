# Stats

![The base game Stats sheet.](https://media.discordapp.net/attachments/1309635210052243487/1312520628120715366/image.png?ex=674ccb97&is=674b7a17&hm=350249aa263326a68f53b465c6e501fa984aa2dbf01850d32a3c3ebf66a75204&=&format=webp&quality=lossless&width=1920&height=180)

The stats sheet contains information for status conditions. 

Heads up: Any field with the _JP suffix simply refers to the japanese translation and will not be included here.

### ID
The numerical ID of your status. Needs to be unique.
### Alias
The text ID of your status. Needs to be unique.
In addition, if the 'type' field is empty, the game will attempt to find a class with this name when making your status effect.
### Name
The text name shown to the player. Does NOT need to be unique.
### Type
The class that will be used to make the status effect. Takes priority over Alias.
The game automatically finds and searches for classes that have this name when applying the status effect. Make sure that the name of the class isn't hidden in your own namespace, and that it inherits from the Condition class.
The type also dictates what icon is used for the status, as it looks for an image with the same name in the icon library.
### Group
Applies certain properties to your state. For example, you can only have one 'Stance' at a time.
### Curse
When an object is cursed and relates to this status, it will try and look for the referenced state instead. Used for stuff like cursed wands.
### Duration
When given a power of p, auto-fills out the duration of the status (in turns, rounded down).
### Hex Power
The chance to resist being removed by status-removing effects. Higher numbers make your status more resistant to being removed.
### Negate
Can be a list of strings. If any status listed in 'negate' is on the character while trying to apply the status, and if the status is not being forced, then the status will not be applied.
### Defense Attribute
When this status is applied to you, if you have the corresponding defense attribute, the severity of the condition is reduced.
### Resistance
Checks one of the (recieving) character's resistance stats. If the stat is high enough, it reduces the severity of the effect (and can even negate it). Essentially a mix between Defense Attribute and Negate.
### Gain Res
Gives resistance to itself. In essence, this reduces the likelihood that a status can be re-applied; and, if it doesn't, reduces its severity.
### Elements
A shorthand way of increasing stats, where p is the status power.
### Nullify
When applied, removes all statuses with this alias.
### Tag
A series of tags with no effects unless otherwise explicitly stated in code. You can put in custom tags to add your own functionality.
### Phase
Used to display how far along a status is to the player. Frankly, this is very hard to intuit from the code and comes with a lot of moving parts. Just make sure there's at least 9 numbers here...
### Colors
When displayed as a text status (like hunger or sleep), shows what color the text should be.
### Effect
The graphical effect displayed when applying the status. Uses the effects library. (Visuals only)
### StrPhase
Used in tandem with phases to indicate the severity of a status verbally.
### Text Phase
Text displayed when the status is applied.
### Text End
... And this for when it is removed.
### Text Phase 2
Used when switching between phases of a status.
### Gradient
Unused, as far as I'm aware.
### Invert
When used in tandem with phases, denotes a low phase as a debuff, and a high phase as a buff. (Used in statuses such as hunger.)
### Detail
Verbal description of a condition.
