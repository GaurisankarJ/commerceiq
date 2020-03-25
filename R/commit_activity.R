ds = read.csv('commit_activity.csv')

library(ggplot2)

p1 <- ggplot() + geom_line(aes(y = total, x = as.Date(week)),
                           data = ds) 

p1 + labs(title = "Commits per Week", x = "Week", y = "Number of Commits")
