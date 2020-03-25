ds = read.csv('code_frequency.csv')

library(ggplot2)

p1 <- ggplot() + geom_line(aes(y = addition, x = as.Date(week)), data = ds, color="blue") +  geom_line(aes(y = deletion, x = as.Date(week)), data = ds, color="red")


p1 + labs(title = "Additions/Deletions per Week", x = "Week", y = "Additions[Blue]/Deletions[Red]")
