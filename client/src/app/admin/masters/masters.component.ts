import { Component, ComponentFactoryResolver, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ComponentLoaderDirective } from 'src/app/_directives/component-loader.directive';
import { TaskPrioritiesComponent } from '../task-priorities/task-priorities.component';
import { TaskStatusComponent } from '../task-status/task-status.component';

@Component({
  selector: 'app-masters',
  templateUrl: './masters.component.html',
  styleUrls: ['./masters.component.css']
})
export class MastersComponent implements OnInit {

  masterMenuItems = [ 
                      {itemName: "TaskPriorities", displayName: "Task Priorities", component: TaskPrioritiesComponent},
                      {itemName: "TaskStatus", displayName: "Task Status", component:TaskStatusComponent}
                    ];

  activeItem: string;
  tabs=[];

  @ViewChildren(ComponentLoaderDirective) componentLoaders: QueryList<ComponentLoaderDirective>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver)
  {
  }



  ngOnInit(): void {
  }

  menuItemClick(clickedMasterMenuItem: any)
  {
    //console.log(clickedMasterMenuItem);
    this.activeItem=clickedMasterMenuItem.itemName;

    let matchingTabs = this.tabs.filter((tab) =>
    {
      return tab.itemName == clickedMasterMenuItem.itemName
    });


     if (matchingTabs.length == 0)
    {
      this.tabs.push({
        tabIndex: this.tabs.length,
        itemName: clickedMasterMenuItem.itemName,
        displayName: clickedMasterMenuItem.displayName
      });

      setTimeout(() => {
        var componentLoadersArray = this.componentLoaders.toArray();
        var componentFactory = this.componentFactoryResolver.resolveComponentFactory(clickedMasterMenuItem.component);

        var viewContainterRef = componentLoadersArray[this.tabs.length - 1].viewContainerRef;
        viewContainterRef.createComponent(componentFactory);
      }, 100);
    }
  }
}
